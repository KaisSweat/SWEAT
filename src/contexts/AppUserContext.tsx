import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDetails } from '../services/firestoreUserService'; // Make sure this path matches your project structure
import { AppUser } from '../types/types'; // Adjust import path as necessary

type AppUserContextType = {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
};

const defaultContextValue: AppUserContextType = {
  user: null,
  setUser: () => {},
};

const AppUserContext = createContext<AppUserContextType>(defaultContextValue);

const AppUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Assume getUserDetails fetches { role, venueId, name, ...otherDetails }
          const userDetails = await getUserDetails(firebaseUser.uid);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: userDetails.role || 'guest',
            venueId: userDetails.venueId || null, // Ensure venueId is included for partners
            name: userDetails.name || '',
            bookings: [], // Initialize bookings, adjust as necessary
            // Include other properties as fetched
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUser(null); // Consider setting user to null or handling errors differently
        }
      } else {
        setUser(null); // No user logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AppUserContext.Provider value={{ user, setUser }}>
      {children}
    </AppUserContext.Provider>
  );
};

// Custom hook to use AppUser context
export const useAppUser = () => useContext(AppUserContext);

export { AppUserProvider, AppUserContext };
