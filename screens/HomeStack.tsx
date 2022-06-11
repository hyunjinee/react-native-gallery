import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';

type HomeStackParamList = {
  FeedScreen: undefined;
  ProfileScreen:
    | {
        userId: string;
        displayName: string;
      }
    | undefined;
};

export type ProfileScreenRouteProp = RouteProp<
  HomeStackParamList,
  'ProfileScreen'
>;

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
