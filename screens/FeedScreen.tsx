import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import PostCard from '../components/PostCard';
import {useUserContext} from '../contexts/UserContext';
import usePosts from '../hooks/usePosts';

function FeedScreen() {
  const user = useUserContext();
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts(
    user.user?.id,
  );
  const postsReady = posts !== null;

  useEffect(() => {
    if (postsReady) {
      SplashScreen.hide();
    }
  }, [postsReady]);

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
