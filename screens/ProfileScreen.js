import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { COLORS } from '../constants/colorscheme';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileErrorMessage from '../components/profile/ProfileErrorMessage';
import ProfileCard from '../components/profile/ProfileCard';
import LogoutButton from '../components/profile/LogoutButton';

import {
  subscribeToUserProfile,
  logoutUser,
} from '../services/app/profileService';
import { getDisplayName, getAvatarLetter } from '../utils/app/profileUtils';

export default function ProfileScreen({ navigation }) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [profileName, setProfileName] = useState('');

  const user = auth().currentUser;

  useEffect(() => {
    const unsubscribe = subscribeToUserProfile(
      user?.uid,
      profileData => {
        setProfileName(profileData.name);
        setErrorMessage('');
        setProfileLoading(false);
      },
      errorMessageText => {
        setProfileName('');
        setErrorMessage(errorMessageText);
        setProfileLoading(false);
      },
    );

    return unsubscribe;
  }, [user?.uid]);

  const handleLogout = async () => {
    setErrorMessage('');

    try {
      setLogoutLoading(true);
      await logoutUser();
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setLogoutLoading(false);
    }
  };

  const displayName = useMemo(() => {
    return getDisplayName({
      profileName,
      userDisplayName: user?.displayName,
      email: user?.email,
    });
  }, [profileName, user?.displayName, user?.email]);

  const avatarLetter = useMemo(() => {
    return getAvatarLetter(displayName);
  }, [displayName]);

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
