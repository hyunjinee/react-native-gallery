import React from 'react';
import {Pressable, StyleSheet, View, Text, Platform} from 'react-native';

interface CustomButtonProps {
  title: string;
  hasMarginBottom?: boolean;
}

function CustomButton({title, hasMarginBottom}: CustomButtonProps) {
  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        style={({pressed}) => [
          styles.wrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  block: {},
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  wrapper: {
    backgroundColor: '#6200ee',
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // color: 'white',
  },
  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;
