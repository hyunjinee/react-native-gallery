import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import PostCard from '../components/PostCard';
import {
  getNewerPosts,
  getOlderPosts,
  getPosts,
  PAGE_SIZE,
  Post,
} from '../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState<{id: string}[] | null>(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  console.log(posts);

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id);
    setRefreshing(false);

    if (newerPosts.length === 0) {
      return;
    }

    setPosts(newerPosts.concat(posts));
  };

  const onLoadMore = async () => {
    if (noMorePost || posts || posts!.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts![posts!.length - 1];

    const olderPosts = await getOlderPosts(lastPost.id);

    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts!.concat(olderPosts));
  };

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
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200e" />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {},
});

export default FeedScreen;
