import {useEffect} from 'react';
import events from '../lib/event';

export default function usePostsEventEffect({
  refresh,
  removePost,
  enabled,
}: {
  refresh: () => void;
  removePost: (postId: string) => void;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    events.addListener('refresh', refresh);
    events.addListener('removePost', removePost);

    return () => {
      events.removeListener('refresh', refresh);
      events.removeListener('removePost', removePost);
    };
  }, [refresh, removePost, enabled]);
}
