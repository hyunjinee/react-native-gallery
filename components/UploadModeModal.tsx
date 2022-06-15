import React from 'react';
import {Modal, Pressable, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UploadModeModalProps {
  visible: boolean;
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

function UploadModeModal({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}: UploadModeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon
              name="camera-alt"
              color="#757575"
              style={styles.icon}
              size={24}
            />
            <Text style={styles.text}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#eee'}}
            style={styles.actionButton}
            onPress={() => {
              console.log('hi');
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" color="#757575" style={styles.icon} size={24} />
            <Text style={styles.text}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default UploadModeModal;
