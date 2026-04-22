import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function PostCard({ item, liked, onToggleLike }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardTopText}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>

      <Text style={styles.postBody}>{item.body}</Text>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.likeButton, liked && styles.likedButton]}
          activeOpacity={0.85}
          onPress={onToggleLike}
        >
          <Text style={[styles.likeIcon, liked && styles.likedIcon]}>
            {liked ? '♥' : '♡'}
          </Text>
          <Text
            style={[styles.likeButtonText, liked && styles.likedButtonText]}
          >
            {liked ? 'Liked' : 'Like'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTopText: {
    flex: 1,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  postBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  likedButton: {
    backgroundColor: COLORS.primary,
  },
  likeIcon: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginRight: 8,
  },
  likedIcon: {
    color: '#FFFFFF',
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  likedButtonText: {
    color: '#FFFFFF',
  },
});
