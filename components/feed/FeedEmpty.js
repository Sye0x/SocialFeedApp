import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function FeedEmpty() {
  return (
    <View style={styles.messageCard}>
      <Text style={styles.emptyTitle}>No posts yet</Text>
      <Text style={styles.emptyText}>Pull a refresh and check again.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
