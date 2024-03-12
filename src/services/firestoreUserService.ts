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

export const getUserDetails = async (userId: string): Promise<{ role: string | null, venueId?: string | null, name: string | null }> => {
  try {
    const userDocSnapshot = await firestore().collection('users').doc(userId).get();

    if (!userDocSnapshot.exists) {
      console.log("User document does not exist");
      return { role: null, name: null }; // Return null values if user document doesn't exist
    }

    const userData = userDocSnapshot.data();
    const userRole = userData?.role || null;
    const userName = userData?.firstName || null; // Correctly fetching 'firstname' as the 'name'
    
    // Directly fetch 'venueId' from the user's data if the user is a partner, otherwise null
    const venueId = userRole === 'partner' ? (userData?.venueId || null) : null;

    return { role: userRole, venueId, name: userName };
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Re-throwing the error for external handling
  }
};