import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDetails } from '../services/firestoreUserService';
import { AppUser } from '../types/types'; // Ensure this import path matches your project structure

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
        try {
          const { role, venueId, name } = await getUserDetails(firebaseUser.uid);
          console.log(`User Details: ${JSON.stringify({ role, venueId, name })}`);
          // Ensure all required AppUser properties are set or have default values
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: role || 'guest', // Default to 'guest' if role is not fetched
            venueId: venueId || '', // Provide empty string if venueId is not applicable
            name: name || '', // Provide a default value for name
            bookings: [], // Provide a default value for bookings
            // Include other properties as needed with appropriate default values
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle the error appropriately
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
