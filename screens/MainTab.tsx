import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraButton from '../components/CameraButton';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';

type MainTabParamList = {
  HomeStack: undefined;
  MyProfileStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="person" color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
      <CameraButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
  text: {
    fontSize: 24,
  },
});

export default MainTab;
