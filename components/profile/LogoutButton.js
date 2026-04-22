import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function LogoutButton({ loading, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.logoutButton, loading && styles.disabledButton]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.logoutText}>Logout</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
