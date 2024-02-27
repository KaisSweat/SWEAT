import firestore from '@react-native-firebase/firestore';
import { AppUser } from '../types/types';

const usersCollection = firestore().collection('users');

// Fetch user data by ID
export const fetchUserData = async (userId: string): Promise<AppUser | null> => {
  try {
    const documentSnapshot = await usersCollection.doc(userId).get();
    if (documentSnapshot.exists) {
      return documentSnapshot.data() as AppUser;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error for handling in the UI
  }
};

// Update user profile data
export const updateUserProfile = async (userId: string, userData: Partial<AppUser>): Promise<void> => {
  try {
    await usersCollection.doc(userId).update(userData);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Fetch user role by ID
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const documentSnapshot = await usersCollection.doc(userId).get();
    if (documentSnapshot.exists) {
      // Assuming the user's role is stored under a 'role' field in their document
      const userRole = documentSnapshot.data()?.role;
      return userRole || null; // Return the role or null if not found
    }
    return null; // Return null if the user document does not exist
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};

// Add other user-related Firestore operations as needed
