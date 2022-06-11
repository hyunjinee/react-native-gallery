import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {PostWithId} from './Profile';

interface PostGridItemProps {
  post: PostWithId;
}
function PostGridItem({post}: PostGridItemProps) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;
  const onPress = () => {};
  console.log(post);
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
        styles.block,
      ]}>
      <Image style={styles.image} source={{uri: post.photoURL}} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
  block: {
    margin: 0.5,
  },
});

export default PostGridItem;
