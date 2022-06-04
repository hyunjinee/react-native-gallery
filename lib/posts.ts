import firestore from '@react-native-firebase/firestore';
import {User} from '../contexts/UserContext';

const postsCollection = firestore().collection('posts');

export interface Post {
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  description: string;
  photoURL: string;
  user: User;
}

export function createPost({
  user,
  photoURL,
  description,
}: {
  user: any;
  photoURL: string;
  description: string;
}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 3;

export async function getOlderPosts(id: string) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  const posts = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getPosts(userId: string) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getNewerPosts(id: string, userId: string) {
  const cursorDoc = await postsCollection.doc(id).get();
  let query = postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);

  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  const snapshot = await query.get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}
