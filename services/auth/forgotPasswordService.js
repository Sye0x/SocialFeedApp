import auth from '@react-native-firebase/auth';

const getForgotPasswordErrorMessage = firebaseError => {
  switch (firebaseError.code) {
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Could not send reset email. Please try again.';
  }
};

export const sendPasswordReset = async email => {
  const trimmedEmail = email.trim().toLowerCase();

  try {
    await auth().sendPasswordResetEmail(trimmedEmail);
    return true;
  } catch (firebaseError) {
    console.log('Forgot Password Error:', firebaseError);
    throw new Error(getForgotPasswordErrorMessage(firebaseError));
  }
};
