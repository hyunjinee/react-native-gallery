import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import MyProfileScreen from './MyProfileScreen';

type MyProfileStackParamList = {
  MyProfileScreen:
    | {
        userId: string;
        displayName: string;
      }
    | undefined;
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
    </Stack.Navigator>
  );
}

export default MyProfileStack;
