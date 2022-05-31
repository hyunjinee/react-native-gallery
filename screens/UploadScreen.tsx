import React from 'react';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {UploadScreenRouteProp} from './RootStack';

function UploadScreen() {
  const route = useRoute<UploadScreenRouteProp>();
  const {width} = useWindowDimensions();

  const {res} = route.params || {};

  return (
    <View style={styles.block}>
      <Image
        source={{uri: res?.assets![0].uri}}
        style={[styles.image, {height: width}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  image: {},
});

export default UploadScreen;
