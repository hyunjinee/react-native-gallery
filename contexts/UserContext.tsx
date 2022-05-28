import React, {useContext, createContext, useState} from 'react';

export interface User {
  id: string | undefined;
  displayName: string;
  photoURL: string | null;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider children={children} value={{user, setUser}} />;
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return userContext;
}
