import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {PostScreenRouteProp} from './HomeStack';

function PostScreen() {
  const route = useRoute<PostScreenRouteProp>();
  const {post} = route.params!;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {},
  contentContainer: {},
});

export default PostScreen;
