import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import Profile from '../components/Profile';
import {
  MyProfileStackRouteProp,
  MyProfileStackNavigationProp,
} from './MyProfileStack';
import {useUserContext} from '../contexts/UserContext';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation<MyProfileStackNavigationProp>();

  const route = useRoute<MyProfileStackRouteProp>();
  const {userId, displayName} = route.params ?? {};
  // displayName;
  // navigation;

  useEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
    });
  }, [navigation, user]);
  return <Profile userId={user?.id as string} />;
}

export default MyProfileScreen;
