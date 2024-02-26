import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppUser } from '../types/types'; // Import the AppUser type

export const convertToAppUser = (firebaseUser: FirebaseAuthTypes.User): AppUser => {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    bookings: [],
    // Add other necessary properties
  };
};