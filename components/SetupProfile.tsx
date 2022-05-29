import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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
  const [loading, setLoading] = useState(false);
  const {setUser} = useUserContext();

  const navigation = useNavigation<RootStackNavigationProp>();

  const {params} = useRoute<WelcomeScreenRouteProp>();
  const {uid} = params || {};

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const extension = asset.fileName?.split('.').pop();

        const reference = storage().ref(`/profile/${uid}.${extension}`);

        try {
          if (Platform.OS === 'android') {
            await reference.putString(asset.base64 as string, 'base64', {
              contentType: asset.type,
            });
          } else {
            await reference.putFile(asset.uri as string);
          }
          photoURL = response ? await reference.getDownloadURL() : null;
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }

    const user: User = {
      id: uid,
      displayName,
      photoURL,
    };

    await createUser(user);

    setUser(user);
    setLoading(false);
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
          source={
            response
              ? {uri: response?.assets[0]?.uri}
              : require('../assets/user.png')
          }
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
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
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
  spinner: {
    marginTop: 20,
  },
});

export default SetupProfile;
