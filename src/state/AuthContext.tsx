import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { FC } from 'react';
import { createContext, useEffect, useState } from 'react';

//import type { User } from '../lib/firebase/firebase';
import { auth } from '../lib/firebase/firebase';

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  currentUser: User | null | undefined;
};

export const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user!);
      console.log(user, 'user');
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
};
