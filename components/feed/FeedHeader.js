import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function FeedHeader({ onRefresh }) {
  return (
    <View style={styles.heroCard}>
      <View>
        <Text style={styles.heroTitle}>Your Feed</Text>
        <Text style={styles.heroSubtitle}>
          Explore the latest posts in a clean and modern layout
        </Text>
      </View>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={onRefresh}
        activeOpacity={0.85}
      >
        <Text style={styles.refreshIcon}>↻</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    maxWidth: 220,
  },
  refreshButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIcon: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
