import {useCallback, useEffect, useState} from 'react';

import {PostWithId} from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import {
  getNewerPosts2,
  getOlderPosts2,
  getPosts2,
  PAGE_SIZE,
} from '../lib/posts';
import usePostsEventEffect from './usePostsEventEffect';

export default function usePosts(userId?: string) {
  const [posts, setPosts] = useState<PostWithId[] | null>(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useUserContext();

  useEffect(() => {
    if (userId) {
      getPosts2({userId}).then(_posts => {
        setPosts(_posts);
        if (_posts.length < PAGE_SIZE) {
          setNoMorePost(true);
        }
      });
    }
  }, [userId]);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts2(lastPost.id, userId as string);

    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }

    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = useCallback(() => {
    async () => {
      if (!posts || posts.length === 0 || refreshing) {
        return;
      }

      const firstPost = posts[0];
      setRefreshing(true);

      const newerPosts = await getNewerPosts2(firstPost.id, userId as string);

      setRefreshing(false);
      if (newerPosts.length === 0) {
        return;
      }

      setPosts(newerPosts.concat(posts));
    };
  }, [posts, userId, refreshing]);

  const removePost = useCallback(
    postId => {
      setPosts(posts!.filter(post => post.id !== postId));
    },
    [posts],
  );

  const updatePost = useCallback(
    ({postId, description}: {postId: string; description: string}) => {
      const nextPosts = posts?.map(post =>
        post.id === postId ? {...post, description} : post,
      );

      setPosts(nextPosts as PostWithId[] | null);
    },
    [posts],
  );

  usePostsEventEffect({
    refresh: onRefresh,
    removePost,
    enabled: !userId || userId === user?.id,
    updatePost,
  });

  return {
    posts,
    noMorePost,
    refreshing,
    onLoadMore,
    onRefresh,
  };
}
