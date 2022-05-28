import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({
  id,
  displayName,
  photoURL,
}: {
  id: string | undefined;
  displayName: string;
  photoURL: string | null;
}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id: string) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
