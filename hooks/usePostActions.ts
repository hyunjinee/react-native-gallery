import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {removePost} from '../lib/posts';

export default function usePostActions({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  const [isSelecting, setIsSelecting] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const edit = () => {
    navigation.navigate('ModifyScreen', {
      id,
      description,
    });
  };

  const remove = async () => {
    console.log(id);
    await removePost(id);

    if (route.name === 'PostScreen') {
      navigation.goBack();
    }
  };

  const onPressMore = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        (buttonIndex: number) => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    } else {
      setIsSelecting(true);
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
