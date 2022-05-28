import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface BorderedInputProps extends TextInputProps {
  hasMarginBottom?: boolean;
  value: string;
  placeholder: string;
  onChangeText: (valie: string) => void;
}

function BorderedInput({hasMarginBottom, ...rest}: BorderedInputProps) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default BorderedInput;
