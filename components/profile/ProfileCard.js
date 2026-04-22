import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function ProfileCard({
  profileLoading,
  avatarLetter,
  displayName,
  email,
}) {
  return (
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
          <Text style={styles.email}>{email}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
