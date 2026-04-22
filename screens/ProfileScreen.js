import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../constants/colorscheme';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileErrorMessage from '../components/profile/ProfileErrorMessage';
import ProfileCard from '../components/profile/ProfileCard';
import LogoutButton from '../components/profile/LogoutButton';

export default function ProfileScreen({ navigation }) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [profileName, setProfileName] = useState('');

  const user = auth().currentUser;

  useEffect(() => {
    if (!user?.uid) {
      setProfileLoading(false);
      setErrorMessage('No logged in user found.');
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            setProfileName(data?.name || '');
            setErrorMessage('');
          } else {
            setProfileName('');
            setErrorMessage('Profile data not found in database.');
          }
          setProfileLoading(false);
        },
        error => {
          console.log('Profile fetch error:', error);
          setErrorMessage('Could not load profile data.');
          setProfileLoading(false);
        },
      );

    return unsubscribe;
  }, [user?.uid]);

  const handleLogout = async () => {
    setErrorMessage('');

    try {
      setLogoutLoading(true);
      await auth().signOut();
    } catch (error) {
      console.log('Logout error:', error);
      setErrorMessage('Something went wrong while logging out.');
    } finally {
      setLogoutLoading(false);
    }
  };

  const displayName = useMemo(() => {
    if (profileName?.trim()) return profileName.trim();
    if (user?.displayName?.trim()) return user.displayName.trim();
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  }, [profileName, user?.displayName, user?.email]);

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        {errorMessage ? <ProfileErrorMessage message={errorMessage} /> : null}

        <ProfileCard
          profileLoading={profileLoading}
          avatarLetter={avatarLetter}
          displayName={displayName}
          email={user?.email || 'No email found'}
        />

        <LogoutButton loading={logoutLoading} onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
});
