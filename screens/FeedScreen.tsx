import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';

function FeedScreen() {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts();
  // const [posts, setPosts] = useState<{id: string}[] | null>(null);
  // const [noMorePost, setNoMorePost] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

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
