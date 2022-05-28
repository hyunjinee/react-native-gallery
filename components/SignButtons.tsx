import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomButton from './CustomButton';
import {RootStackNavigationProp} from '../screens/RootStack';

interface SignButtonsProps {
  isSignUp: boolean;
  onSubmit: () => void;
  loading: boolean;
}

function SignButtons({isSignUp, onSubmit, loading}: SignButtonsProps) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignInScreen', {isSignUp: true});
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator
          size={32}
          color="#6200ee"
          style={styles.spinnerWrapper}
        />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
      <CustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginiTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignButtons;
