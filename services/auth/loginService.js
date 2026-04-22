import auth from '@react-native-firebase/auth';

const getFirebaseLoginErrorMessage = error => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Login failed. Please try again.';
  }
};

export const loginUser = async ({ email, password }) => {
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      trimmedEmail,
      password,
    );

    const user = userCredential.user || auth().currentUser;

    if (!user) {
      throw new Error('Login succeeded, but user session was not found.');
    }

    return user;
  } catch (error) {
    console.log('Login Error:', error);
    throw new Error(getFirebaseLoginErrorMessage(error));
  }
};
