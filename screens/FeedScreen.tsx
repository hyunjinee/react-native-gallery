import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import PostCard from '../components/PostCard';
import {getPosts, Post} from '../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState<{id: string}[] | null>(null);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  console.log(posts);

  const renderItem = ({item}: any) => (
    <PostCard
      createdAt={item.createdAt}
      description={item.description}
      id={item.id}
      user={item.user}
      photoURL={item.photoURL}
    />
  );
  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

export default FeedScreen;
