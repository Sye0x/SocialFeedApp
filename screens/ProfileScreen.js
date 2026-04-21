import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../constants/colorscheme';

//redux
import { useAppDispatch } from '../redux/hooks';

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Your account information</Text>
        </View>

        {errorMessage ? (
          <View style={styles.messageBoxError}>
            <Text style={styles.messageTextError}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatarLetter}</Text>
              </View>
            </View>
          </View>

          {profileLoading ? (
            <View style={styles.profileLoadingWrapper}>
              <ActivityIndicator color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>
                {user?.email || 'No email found'}
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, logoutLoading && styles.disabledButton]}
          onPress={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.logoutText}>Logout</Text>
          )}
        </TouchableOpacity>
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  messageBoxError: {
    backgroundColor: 'rgba(255, 77, 79, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 79, 0.35)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  messageTextError: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 22,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarOuter: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
  },
  profileLoadingWrapper: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 10,
    fontSize: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  infoSection: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  infoRow: {
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  infoValueSmall: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
