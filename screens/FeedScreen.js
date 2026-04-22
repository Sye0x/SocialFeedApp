import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { COLORS } from '../constants/colorscheme';
import { fetchPosts, toggleLike, setLikedPosts } from '../redux/postsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import FeedHeader from '../components/feed/FeedHeader';
import PostCard from '../components/feed/PostCard';
import FeedLoading from '../components/feed/FeedLoading';
import FeedError from '../components/feed/FeedError';
import FeedEmpty from '../components/feed/FeedEmpty';

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

    if (!user?.uid) {
      dispatch(setLikedPosts([]));
      setLikesLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        documentSnapshot => {
          if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            dispatch(setLikedPosts(data?.likedPostIds || []));
          } else {
            dispatch(setLikedPosts([]));
          }
          setLikesLoading(false);
        },
        error => {
          console.log('Liked posts listener error:', error);
          setLikesLoading(false);
        },
      );

    return unsubscribe;
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const handleToggleLike = async postId => {
    const user = auth().currentUser;
    if (!user?.uid) return;

    const alreadyLiked = likedPostIds.includes(postId);

    // instant UI update
    dispatch(toggleLike(postId));

    try {
      if (alreadyLiked) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            likedPostIds: firestore.FieldValue.arrayRemove(postId),
          });
      } else {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            likedPostIds: firestore.FieldValue.arrayUnion(postId),
          });
      }
    } catch (error) {
      console.log('Toggle like error:', error);

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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<FeedHeader onRefresh={handleRefresh} />}
        ListEmptyComponent={<FeedEmpty />}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            liked={likedPostIds.includes(item.id)}
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
