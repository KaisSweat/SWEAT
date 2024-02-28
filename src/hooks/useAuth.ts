import { useState, useEffect } from 'react';
import firebase from '@react-native-firebase/app';
import { getUserDetails } from '../services/firestoreUserService'; // Ensure this function is correctly implemented

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  venueId: string | null; // Explicitly string or null
  error: string | null;
}

const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    userRole: null,
    venueId: null, // Initialize as null
    error: null,
  });

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDetails = await getUserDetails(user.uid);
          // Use null coalescing operator to ensure venueId is null instead of undefined
          setState({
            isLoading: false,
            isAuthenticated: true,
            userRole: userDetails.role,
            venueId: userDetails.venueId ?? null, // Convert undefined to null
            error: null,
          });
        } catch (error) {
          const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
          setState({
            isLoading: false,
            isAuthenticated: false,
            userRole: null,
            venueId: null, // Ensure venueId is also reset on error
            error: errorMessage,
          });
        }
      } else {
        setState({
          isLoading: false,
          isAuthenticated: false,
          userRole: null,
          venueId: null, // Reset venueId when not authenticated
          error: null,
        });
      }
    });

    return () => subscriber(); // Clean up the subscriber
  }, []);

  return state;
};

export default useAuth;
