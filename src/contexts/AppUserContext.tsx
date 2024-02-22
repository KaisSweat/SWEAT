import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AppUser } from '../types/types';

type AppUserContextType = {
  user: AppUser | null;
};
const defaultContextValue: AppUserContextType = {
  user: null, // Default to null before user data is loaded
};
export const AppUserContext = createContext<AppUserContextType>(defaultContextValue);

export const useAppUser = (): AppUserContextType => {
  return useContext(AppUserContext);
};


interface AppUserProviderProps {
  children: ReactNode;
}

export const AppUserProvider: FC<AppUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Fetching user data from Firestore...');
      try {
        // Fetch user data from Firestore for predefined user id 'user1'
        const userDoc = await firestore().collection('users').doc('user1').get();
        if (userDoc.exists) {
          console.log('User data fetched successfully:', userDoc.data());
          setUser({ id: userDoc.id, ...userDoc.data() } as AppUser);
        } else {
          console.error('User not found in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppUserContext.Provider value={{ user }}>
      {children}
    </AppUserContext.Provider>
  );
};
