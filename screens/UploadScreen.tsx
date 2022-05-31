import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Animated,
  Keyboard,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {UploadScreenRouteProp} from './RootStack';

function UploadScreen() {
  const route = useRoute<UploadScreenRouteProp>();
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const {res} = route.params || {};

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

  return (
    <View style={styles.block}>
      <Animated.Image
        source={{uri: res?.assets![0].uri}}
        style={[styles.image, {height: animation}]}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력해주세요."
        textAlignVertical="top"
      />
    </View>
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
