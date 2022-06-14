import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

import usePosts from '../hooks/usePosts';
import events from '../lib/event';
import {Post} from '../lib/posts';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

interface ProfileProps {
  userId: string;
}

export interface PostWithId extends Post {
  id: string;
}

function Profile({userId}: ProfileProps) {
  const [user, setUser] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} =
    usePosts(userId);
  const {user: me} = useUserContext();

  const isMyProfile = me?.id === userId;

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    if (!isMyProfile) {
      return;
    }

    events.addListener('refresh', onRefresh);
    events.addListener('removePost', removePost);

    return () => {
      events.removeListener('refresh', onRefresh);
      events.removeListener('removePost', removePost);
    };
  }, [isMyProfile, onRefresh, removePost]);

  const renderItem = ({item}: {item: PostWithId}) => (
    <PostGridItem post={item} />
  );

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      data={posts as PostWithId[]}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Profile;
