import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

import {
  RootStackNavigationProp,
  WelcomeScreenRouteProp,
} from '../screens/RootStack';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {createUser} from '../lib/users';
import {signOut} from '../lib/auth';
import {User, useUserContext} from '../contexts/UserContext';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);
  const {setUser} = useUserContext();

  const navigation = useNavigation<RootStackNavigationProp>();

  const {params} = useRoute<WelcomeScreenRouteProp>();
  const {uid} = params || {};

  const onSubmit = async () => {
    const user: User = {
      id: uid,
      displayName,
      photoURL: null,
    };

    await createUser(user);

    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={{uri: response?.assets[0]?.uri as string}}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
          <CustomButton title="취소" onPress={onCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  circle: {
    width: 128,
    height: 128,
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
