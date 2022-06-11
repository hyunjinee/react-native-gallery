import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';

type MyProfileStackParamList = {
  MyProfileScreen:
    | {
        userId: string;
        displayName: string;
      }
    | undefined;

  PostScreen: undefined;
};

export type MyProfileStackNavigationProp =
  NativeStackNavigationProp<MyProfileStackParamList>;

export type MyProfileStackRouteProp = RouteProp<
  MyProfileStackParamList,
  'MyProfileScreen'
>;

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{title: '게시물'}}
      />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
