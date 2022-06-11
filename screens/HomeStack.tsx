import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import {PostWithId} from '../components/Profile';

type HomeStackParamList = {
  FeedScreen: undefined;
  ProfileScreen:
    | {
        userId: string;
        displayName: string;
      }
    | undefined;
  PostScreen: {post: PostWithId} | undefined;
};

export type ProfileScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ProfileScreen'
>;

export type PostScreenRouteProp = RouteProp<HomeStackParamList, 'PostScreen'>;

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{title: '게시물'}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
