import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const subscribeToUserProfile = (uid, onSuccess, onError) => {
  if (!uid) {
    onError('No logged in user found.');
    return () => {};
  }

  const unsubscribe = firestore()
    .collection('users')
    .doc(uid)
    .onSnapshot(
      documentSnapshot => {
        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          onSuccess({
            name: data?.name || '',
          });
        } else {
          onError('Profile data not found in database.');
        }
      },
      error => {
        console.log('Profile fetch error:', error);
        onError('Could not load profile data.');
      },
    );

  return unsubscribe;
};

export const logoutUser = async () => {
  try {
    await auth().signOut();
    return true;
  } catch (error) {
    console.log('Logout error:', error);
    throw new Error('Something went wrong while logging out.');
  }
};
