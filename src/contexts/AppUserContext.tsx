import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppUser } from '../types/types';

type AppUserContextType = {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
};

const defaultContextValue: AppUserContextType = {
  user: null,
  setUser: () => {},
};

export const AppUserContext = createContext<AppUserContextType>(defaultContextValue);

export const AppUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = firestore().collection('users').doc(firebaseUser.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          const userData = doc.data() as AppUser;
          setUser({ ...userData, id: firebaseUser.uid, email: firebaseUser.email || '' });
        } else {
          console.log('User document does not exist in Firestore. It should be created during sign-up.');
          // Optionally handle this case, e.g., by logging out the user or prompting to complete their profile
        }
      } else {
        setUser(null); // Set user to null if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return (
    <AppUserContext.Provider value={{ user, setUser }}>
      {children}
    </AppUserContext.Provider>
  );
};
