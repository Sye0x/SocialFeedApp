import firestore from '@react-native-firebase/firestore';

export const subscribeToLikedPosts = (uid, onSuccess, onError) => {
  if (!uid) {
    onSuccess([]);
    return () => {};
  }

  const unsubscribe = firestore()
    .collection('users')
    .doc(uid)
    .onSnapshot(
      documentSnapshot => {
        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          onSuccess(data?.likedPostIds || []);
        } else {
          onSuccess([]);
        }
      },
      error => {
        console.log('Liked posts listener error:', error);
        onError('Could not load liked posts.');
      },
    );

  return unsubscribe;
};

export const updateLikedPost = async ({ uid, postId, alreadyLiked }) => {
  if (!uid) {
    throw new Error('No logged in user found.');
  }

  try {
    if (alreadyLiked) {
      await firestore()
        .collection('users')
        .doc(uid)
        .update({
          likedPostIds: firestore.FieldValue.arrayRemove(postId),
        });
    } else {
      await firestore()
        .collection('users')
        .doc(uid)
        .update({
          likedPostIds: firestore.FieldValue.arrayUnion(postId),
        });
    }

    return true;
  } catch (error) {
    console.log('Toggle like error:', error);
    throw new Error('Could not update like status.');
  }
};
