import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import usePostActions from '../hooks/usePostActions';
import ActionSheetModal from './ActionSheetModal';
import {User, useUserContext} from '../contexts/UserContext';
import {HomeStackNavigationProp} from '../screens/HomeStack';
import {MyProfileStackNavigationProp} from '../screens/MyProfileStack';

interface PostCardProps {
  user: User;
  photoURL: string;
  description: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
}

function PostCard({user, photoURL, description, createdAt, id}: PostCardProps) {
  const date = useMemo(
    () => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()),
    [createdAt],
  );

  const navigation = useNavigation<
    HomeStackNavigationProp | MyProfileStackNavigationProp
  >();
  const routeNames = useNavigationState(state => state.routeNames);

  const {user: me} = useUserContext();
  const isMyPost = me?.id === user.id;

  const {isSelecting, onPressMore, onClose, actions} = usePostActions({
    id,
    description,
  });

  const onOpenProfile = () => {
    if (routeNames.find(routeName => routeName === 'MyProfileScreen')) {
      navigation.navigate('MyProfileScreen');
    } else {
      navigation.navigate('ProfileScreen', {
        userId: user.id,
        displayName: user.displayName,
      });
    }

    // navigation.navigate('ProfileScreen', {
    //   displayName: user.displayName!,
    //   userId: user.id!,
    // });
  };

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png')
            }
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
        {isMyPost && (
          <Pressable hitSlop={8} onPress={onPressMore}>
            <Icon name="more-vert" size={20} />
          </Pressable>
        )}
      </View>
      <Image
        source={{uri: photoURL}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.paddingBlock}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      </View>

      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  image: {
    width: '100%',
    backgroundColor: '#bdbdbd',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
