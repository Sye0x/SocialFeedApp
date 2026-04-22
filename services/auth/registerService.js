import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getFirebaseErrorMessage = error => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/weak-password':
      return 'Password is too weak.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    default:
      return 'Registration failed. Please try again.';
  }
};

export const registerUser = async ({ name, email, password }) => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      trimmedEmail,
      password,
    );

    const uid = userCredential.user.uid;

    await firestore().collection('users').doc(uid).set({
      uid,
      name: trimmedName,
      email: trimmedEmail,
      likedPostIds: [],
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return userCredential.user;
  } catch (error) {
    console.log('Register Error:', error);
    throw new Error(getFirebaseErrorMessage(error));
  }
};
