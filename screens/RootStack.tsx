import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ImagePickerResponse} from 'react-native-image-picker';

import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import UploadScreen from './UploadScreen';
import ModifyScreen from './ModifyScreen';
import {User, useUserContext} from '../contexts/UserContext';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';
import SettingScreen from './SettingScreen';

type RootStackParamList = {
  MainTab: undefined;
  UploadScreen:
    | {
        res: ImagePickerResponse;
      }
    | undefined;
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
  ModifyScreen:
    | {
        id: string;
        description: string;
      }
    | undefined;
  SettingScreen: undefined;
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

export type UploadScreenRouteProp = RouteProp<
  RootStackParamList,
  'UploadScreen'
>;

export type ModifyScreenRouteProp = RouteProp<
  RootStackParamList,
  'ModifyScreen'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async (currentUser: any) => {
      unsubscribe();
      if (!currentUser) {
        return;
      }
      const profile = await getUser(currentUser.id);
      if (!profile) {
        return;
      }
      setUser(profile as User);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UploadScreen"
            component={UploadScreen}
            options={{title: '새 게시물', headerBackTitle: '뒤로가기'}}
          />
          <Stack.Screen
            name="ModifyScreen"
            component={ModifyScreen}
            options={{title: '수정', headerBackTitle: '뒤로가기'}}
          />
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            // options={{
            //   headerShown: false,
            // }}
            options={{
              title: '설정',
              headerBackTitle: '뒤로가기',
            }}
          />
        </>
      ) : (
        <>
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
          <Stack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{
              headerBackTitle: '뒤로가기',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
