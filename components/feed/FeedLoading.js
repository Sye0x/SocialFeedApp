import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function FeedLoading() {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.loaderCard}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loaderCard: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderRadius: 18,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});
