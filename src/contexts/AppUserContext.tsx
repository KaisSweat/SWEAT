import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserDetails } from '../services/firestoreUserService'; // Adjust the path as needed
import { AppUser } from '../types/types'; // Ensure this includes your Balance type

type AppUserContextType = {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  isLoading: boolean; // Added loading state
};

const defaultContextValue: AppUserContextType = {
  user: null,
  setUser: () => {},
  isLoading: false, // Default loading state is false
};

const AppUserContext = createContext<AppUserContextType>(defaultContextValue);

const AppUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize isLoading as true

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setIsLoading(true); // Set loading to true when auth state changes
      if (firebaseUser) {
        try {
          const userDetails = await getUserDetails(firebaseUser.uid);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: userDetails.role || 'guest',
            venueId: userDetails.venueId || null,
            firstName: userDetails.firstName || '',
            lastName: userDetails.lastName || '',
            bookings: [], // Initialize or fetch bookings, adjust as necessary
            balance: userDetails.balance || {}, // Assuming balance is part of the userDetails fetched
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUser(null); // Set user to null on error
        } finally {
          setIsLoading(false); // Set loading to false after attempting to fetch user details
        }
      } else {
        setUser(null); // Set user to null if no firebase user
        setIsLoading(false); // Also set loading to false if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <AppUserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AppUserContext.Provider>
  );
};

// Custom hook to use AppUser context
export const useAppUser = () => useContext(AppUserContext);

export { AppUserProvider, AppUserContext };
