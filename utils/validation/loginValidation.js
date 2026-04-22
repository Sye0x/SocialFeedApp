export const validateLoginForm = formData => {
  const { email, password } = formData;

  const errors = {};
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
};
