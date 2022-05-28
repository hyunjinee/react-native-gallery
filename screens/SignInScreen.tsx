import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {RootStackNavigationProp, SignInScreenRouteProp} from './RootStack';
import SignForm from '../components/SignForm';
import SignButtons from '../components/SignButtons';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';
import {User, useUserContext} from '../contexts/UserContext';

function SignInScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useRoute<SignInScreenRouteProp>();

  const isSignUp = params?.isSignUp ?? undefined;

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const {setUser} = useUserContext();

  const createChangeTextHandler = (name: string) => (value: string) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const info = {email, password};
    setLoading(true);

    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      console.log(user);
      const profile = await getUser(user.uid);

      if (!profile) {
        navigation.navigate('WelcomeScreen', {uid: user.uid});
      } else {
        setUser(profile as User);
        navigation.navigate('WelcomeScreen', {uid: user.uid});
      }
    } catch (error: any) {
      const messages = {
        'auth/email-already-in-use': '이미 사용중인 이메일입니다.',
        'auth/invalid-email': '유효하지 않은 이메일입니다.',
        'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
      };

      const msg =
        messages[
          error.code as
            | 'auth/email-already-in-use'
            | 'auth/invalid-email'
            | 'auth/wrong-password'
            | 'auth/user-not-found'
        ] || `${isSignUp ? '가입' : '로그인'} 실패`;

      Alert.alert('실패', msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={!!isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={!!isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
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
