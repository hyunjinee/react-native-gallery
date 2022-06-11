import React from 'react';
import {Image} from 'react-native';

interface AvatarProps {
  source: string;
  size: number;
  style?: any;
}

function Avatar({source, size, style = 32}: AvatarProps) {
  return (
    <Image
      source={source || require('../assets/user.png')}
      style={[style, {width: size, height: size, borderRadius: size / 2}]}
      resizeMode="cover"
    />
  );
}

// const styles = StyleSheet.create({
//   avatar: {},
// });

export default Avatar;
