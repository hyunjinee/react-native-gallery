import {useEffect} from 'react';
import events from '../lib/event';

export default function usePostsEventEffect({
  refresh,
  removePost,
  enabled,
  updatePost,
}: {
  refresh: () => void;
  removePost: (postId: string) => void;
  enabled: boolean;
  updatePost: ({
    postId,
    description,
  }: {
    postId: string;
    description: string;
  }) => void;
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    events.addListener('refresh', refresh);
    events.addListener('removePost', removePost);
    events.addListener('updatePost', updatePost);

    return () => {
      events.removeListener('refresh', refresh);
      events.removeListener('removePost', removePost);
      events.removeListener('updatePost', updatePost);
    };
  }, [refresh, removePost, enabled, updatePost]);
}
