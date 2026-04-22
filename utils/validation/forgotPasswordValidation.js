export const validateForgotPasswordEmail = email => {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail) {
    return 'Email is required';
  }

  if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
    return 'Enter a valid email';
  }

  return '';
};
