import React, {useRef} from 'react';
import {TextInput} from 'react-native';
import BorderedInput from './BorderedInput';

interface SignFormProps {
  isSignUp: boolean;
  onSubmit: () => void;
  form: {email: string; password: string; confirmPassword: string};
  createChangeTextHandler: (name: string) => (value: string) => void;
}

function SignForm({
  isSignUp,
  onSubmit,
  form,
  createChangeTextHandler,
}: SignFormProps) {
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        onSubmitEditing={() => {
          if (passwordRef.current !== null) {
            passwordRef.current.focus();
          }
        }}
        returnKeyType="next"
      />
      <BorderedInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        hasMarginBottom={!!isSignUp}
        secureTextEntry
        ref={passwordRef}
        returnKeyType="next"
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}
export default SignForm;
