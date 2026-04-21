import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colorscheme';
import { fetchPosts, toggleLike } from '../redux/postsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function FeedScreen({ navigation }) {
  const dispatch = useAppDispatch();

  const postsState = useAppSelector(state => state.posts);
  const posts = postsState?.posts || [];
  const loading = postsState?.loading || false;
  const error = postsState?.error || null;
  const likedPostIds = postsState?.likedPostIds || [];

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const renderPost = ({ item }) => {
    const liked = likedPostIds.includes(item.id);

    return (
      <View style={styles.card}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>

        <TouchableOpacity
          style={[styles.likeButton, liked && styles.likedButton]}
          onPress={() => dispatch(toggleLike(item.id))}
        >
          <Text style={styles.likeButtonText}>{liked ? 'Unlike' : 'Like'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Feed</Text>
          <Text style={styles.subtitle}>Latest posts</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshText}>Refresh Posts</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchPosts())}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPost}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No posts available</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  profileButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  refreshButton: {
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  refreshText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  likeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: COLORS.error,
  },
  likeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 30,
    fontSize: 15,
  },
});
