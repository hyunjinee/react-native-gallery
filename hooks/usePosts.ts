import {useEffect, useState} from 'react';
import {PostWithId} from '../components/Profile';
import {
  getNewerPosts2,
  getOlderPosts2,
  getPosts2,
  PAGE_SIZE,
} from '../lib/posts';

export default function usePosts(userId?: string) {
  const [posts, setPosts] = useState<PostWithId[] | null>(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts2(lastPost.id, userId);

    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }

    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefreshing(true);

    const newerPosts = await getNewerPosts2(firstPost.id, userId);

    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }

    setPosts(newerPosts.concat(posts));
  };

  useEffect(() => {
    getPosts2({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  return {
    posts,
    noMorePost,
    refreshing,
    onLoadMore,
    onRefresh,
  };
}
