export const getDisplayName = ({ profileName, userDisplayName, email }) => {
  if (profileName?.trim()) {
    return profileName.trim();
  }

  if (userDisplayName?.trim()) {
    return userDisplayName.trim();
  }

  if (email) {
    return email.split('@')[0];
  }

  return 'User';
};

export const getAvatarLetter = displayName => {
  if (!displayName?.trim()) {
    return 'U';
  }

  return displayName.trim().charAt(0).toUpperCase();
};
