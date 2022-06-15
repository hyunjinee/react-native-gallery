import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import Profile from '../components/Profile';
import {ProfileScreenRouteProp} from './HomeStack';
import {MyProfileStackNavigationProp} from './MyProfileStack';

function ProfileScreen() {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation<MyProfileStackNavigationProp>();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId as string} />;
}

export default ProfileScreen;
