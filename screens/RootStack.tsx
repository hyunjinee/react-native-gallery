import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';

type RootStackParamList = {
  SignInScreen:
    | {
        isSignUp: boolean;
      }
    | undefined;
  WelcomeScreen:
    | {
        uid: string;
      }
    | undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type SignInScreenRouteProp = RouteProp<
  RootStackParamList,
  'SignInScreen'
>;

export type WelcomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'WelcomeScreen'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
