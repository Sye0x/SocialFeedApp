import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colorscheme';

export default function ProfileErrorMessage({ message }) {
  return (
    <View style={styles.messageBoxError}>
      <Text style={styles.messageTextError}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  messageBoxError: {
    backgroundColor: 'rgba(255, 77, 79, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 79, 0.35)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  messageTextError: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
  },
});
