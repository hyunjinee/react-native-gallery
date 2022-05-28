import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface BorderedInputProps {
  hasMarginBottom?: boolean;
  value: string;
  placeholder: string;
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
