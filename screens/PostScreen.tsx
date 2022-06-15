import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';

import PostCard from '../components/PostCard';
import {HomeStackNavigationProp, PostScreenRouteProp} from './HomeStack';
import events from '../lib/event';

function PostScreen() {
  const route = useRoute<PostScreenRouteProp>();
  const navigation = useNavigation<HomeStackNavigationProp>();

  const {post} = route.params!;

  useEffect(() => {
    const handler = ({description}: {description: string}) => {
      navigation.setParams({post: {...post, description}});
    };

    events.addListener('updatePost', handler);

    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [post, navigation]);

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
