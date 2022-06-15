import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {v4} from 'uuid';

import {createPost} from '../lib/posts';
import {RootStackNavigationProp, UploadScreenRouteProp} from './RootStack';
import IconRightButton from '../components/IconRightButton';
import {useUserContext} from '../contexts/UserContext';
import events from '../lib/event';

function UploadScreen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');
  const {width} = useWindowDimensions();
  const {user} = useUserContext();
  const animation = useRef(new Animated.Value(width)).current;

  const route = useRoute<UploadScreenRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();

  const {res} = route.params || {};

  const onSubmit = useCallback(async () => {
    navigation.pop();
    const asset = res?.assets![0];

    const extension = asset?.fileName?.split('.').pop();
    const reference = storage().ref(`/photo/${user?.id}/${v4()}.${extension}`);

    if (Platform.OS === 'android') {
      await reference.putString(asset?.base64!, 'base64', {
        contentType: asset?.type,
      });
    } else {
      await reference.putFile(asset?.uri!);
    }
    const photoURL = await reference.getDownloadURL();
    await createPost({description, photoURL, user});

    events.emit('refresh');
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );

    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      keyboardVerticalOffset={Platform.select({
        ios: 180,
      })}
      style={styles.block}>
      <Animated.Image
        source={{uri: res?.assets![0].uri}}
        style={[styles.image, {height: animation}]}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력해주세요."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    // backgroundColor: 'red',
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
