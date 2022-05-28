import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {
  RootStackNavigationProp,
  WelcomeScreenRouteProp,
} from '../screens/RootStack';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {createUser} from '../lib/users';
import {signOut} from '../lib/auth';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');

  const navigation = useNavigation<RootStackNavigationProp>();

  const {params} = useRoute<WelcomeScreenRouteProp>();
  const {uid} = params || {};

  const onSubmit = () => {
    createUser({
      id: uid,
      displayName,
      photoURL: null,
    });
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.circle} />
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
