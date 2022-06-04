import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {User} from '../contexts/UserContext';
import {getPosts} from '../lib/posts';
import {getUser} from '../lib/users';

interface ProfileProps {
  userId: string;
}

function Profile({userId}: ProfileProps) {
  const [user, setUser] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);
  const [posts, setPosts] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >();

  useEffect(() => {
    getUser(userId).then(setUser);
    getPosts(userId).then(setPosts);
  }, [userId]);

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
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png')
            }
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {},
  block: {},
  userInfo: {},
  avatar: {},
  username: {},
});

export default Profile;
