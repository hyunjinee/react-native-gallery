import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {
  MyProfileStackRouteProp,
  MyProfileStackNavigationProp,
} from './MyProfileStack';

function MyProfileScreen() {
  const route = useRoute<MyProfileStackRouteProp>();
  const navigation = useNavigation<MyProfileStackNavigationProp>();
  const {userId, displayName} = route.params ?? {};
  displayName;
  navigation;

  console.log(userId, '?');

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);
  return <Profile userId={userId as string} />;
}

export default MyProfileScreen;
