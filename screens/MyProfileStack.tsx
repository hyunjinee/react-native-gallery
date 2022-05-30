import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyProfileScreen from './MyProfileScreen';

type MyProfileStackParamList = {
  MyProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
