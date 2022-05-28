import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  SignInScreen:
    | {
        isSignUp: boolean;
      }
    | undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type SignInScreenRouteProp = RouteProp<
  RootStackParamList,
  'SignInScreen'
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
    </Stack.Navigator>
  );
}

export default RootStack;
