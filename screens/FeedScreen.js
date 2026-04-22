import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import { COLORS } from '../constants/colorscheme';
import { fetchPosts, toggleLike, setLikedPosts } from '../redux/postsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import FeedHeader from '../components/feed/FeedHeader';
import PostCard from '../components/feed/PostCard';
import FeedLoading from '../components/feed/FeedLoading';
import FeedError from '../components/feed/FeedError';
import FeedEmpty from '../components/feed/FeedEmpty';

import {
  subscribeToLikedPosts,
  updateLikedPost,
} from '../services/app/feedService';
import { getPostKey, isPostLiked } from '../utils/app/feedUtils';

export default function FeedScreen() {
  const dispatch = useAppDispatch();

  const postsState = useAppSelector(state => state.posts);
  const posts = postsState?.posts || [];
  const loading = postsState?.loading || false;
  const error = postsState?.error || null;
  const likedPostIds = postsState?.likedPostIds || [];

  const [likesLoading, setLikesLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const user = auth().currentUser;

    const unsubscribe = subscribeToLikedPosts(
      user?.uid,
      likedIds => {
        dispatch(setLikedPosts(likedIds));
        setLikesLoading(false);
      },
      errorMessage => {
        dispatch(setLikedPosts([]));
        setLikesLoading(false);
        console.log(errorMessage);
      },
    );

    return unsubscribe;
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const handleToggleLike = async postId => {
    const user = auth().currentUser;

    if (!user?.uid) {
      return;
    }

    const alreadyLiked = isPostLiked(likedPostIds, postId);

    // instant UI update
    dispatch(toggleLike(postId));

    try {
      await updateLikedPost({
        uid: user.uid,
        postId,
        alreadyLiked,
      });
    } catch (error) {
      // rollback if firestore write fails
      dispatch(toggleLike(postId));
    }
  };

  if (loading || likesLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.background}
        />
        <FeedLoading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.background}
        />
        <FeedError error={error} onRetry={() => dispatch(fetchPosts())} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <FlatList
        data={posts}
        keyExtractor={getPostKey}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<FeedHeader onRefresh={handleRefresh} />}
        ListEmptyComponent={<FeedEmpty />}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            liked={isPostLiked(likedPostIds, item.id)}
            onToggleLike={() => handleToggleLike(item.id)}
          />
        )}
        refreshing={loading}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120,
  },
});
