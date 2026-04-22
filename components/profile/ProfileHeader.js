import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function ProfileHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your account information</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
