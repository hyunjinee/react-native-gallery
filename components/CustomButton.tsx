import React from 'react';
import {Pressable, StyleSheet, View, Text, Platform} from 'react-native';

interface CustomButtonProps {
  title: string;
  hasMarginBottom?: boolean;
  theme?: string;
  onPress: () => void;
}

function CustomButton({
  title,
  hasMarginBottom,
  theme = 'primary',
  onPress,
}: CustomButtonProps) {
  const isPrimary = theme === 'primary';

  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: isPrimary ? '#ffffff' : '#6200ee'}}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
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
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6200ee',
  },
  wrapper: {
    // backgroundColor: '#6200ee',
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
