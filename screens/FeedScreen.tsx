import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import PostCard from '../components/PostCard';
import {useUserContext} from '../contexts/UserContext';
import usePosts from '../hooks/usePosts';
import events from '../lib/event';

function FeedScreen() {
  const user = useUserContext();
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} =
    usePosts(user.user?.id);

  useEffect(() => {
    events.addListener('refresh', onRefresh);
    events.addListener('removePost', removePost);

    return () => {
      events.removeListener('refresh', onRefresh);
      events.removeListener('removePost', removePost);
    };
  }, [onRefresh, removePost]);

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
