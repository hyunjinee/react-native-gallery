import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import {RootStackNavigationProp, SignInScreenRouteProp} from './RootStack';

function SignInScreen() {
  const {params} = useRoute<SignInScreenRouteProp>();
  const isSignUp = params?.isSignUp ?? {};
  const navigation = useNavigation<RootStackNavigationProp>();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <Text style={styles.text}>PublicGallery</Text>
      <View style={styles.form}>
        <BorderedInput
          hasMarginBottom
          placeholder="이메일"
          value={form.email}
          onChangeText={createChangeTextHandler('email')}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <BorderedInput
          placeholder="비밀번호"
          value={form.password}
          onChangeText={createChangeTextHandler('password')}
          hasMarginBottom={!!isSignUp}
          secureTextEntry
        />
        {isSignUp && (
          <BorderedInput
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('confirmPassword')}
            secureTextEntry
          />
        )}
        <View style={styles.buttons}>
          {isSignUp ? (
            <>
              <CustomButton
                title="회원가입"
                hasMarginBottom
                onPress={onSubmit}
              />
              <CustomButton
                title="로그인"
                theme="secondary"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </>
          ) : (
            <>
              <CustomButton title="로그인" hasMarginBottom onPress={onSubmit} />
              <CustomButton
                title="회원가입"
                theme="secondary"
                onPress={() => {
                  navigation.push('SignInScreen', {isSignUp: true});
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
