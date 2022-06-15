import React from 'react';
import {Pressable, View, Text, Platform, StyleSheet} from 'react-native';

import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

function SettingScreen() {
  const {setUser} = useUserContext();

  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <View style={styles.block}>
      <Pressable
        onPress={onLogout}
        android_ripple={{
          color: '#eee',
        }}
        style={({pressed}) => [
          styles.item,
          pressed && Platform.select({ios: {opacity: 0.5}}),
        ]}>
        <Text style={styles.itemText}>로그아웃</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, paddingTop: 32},
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  itemText: {fontSize: 16},
});

export default SettingScreen;
