export const validateRegisterForm = formData => {
  const { name, email, password, confirmPassword } = formData;

  const errors = {};

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    errors.name = 'Name is required';
  } else if (/\d/.test(trimmedName)) {
    errors.name = 'Name should not contain numbers';
  } else if (trimmedName.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!trimmedEmail) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&]).{8,}/.test(password)
  ) {
    errors.password =
      'Password must contain uppercase, lowercase, number, and special character';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
