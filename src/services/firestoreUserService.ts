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

export const getUserDetails = async (userId: string): Promise<AppUser> => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    const userData = userDoc.data();
    if (!userData) {
      throw new Error("Failed to fetch user data");
    }
    // Ensure that the object returned here includes all properties expected by the AppUser interface
    const userDetails: AppUser = {
      id: userId, // Ensure you include the userId in the userDetails
      email: userData.enamemail || '',
      role: userData.role || 'guest',
      venueId: userData.venueId || null,
      firstName: userData.firstname || '',
      lastName: userData.firstname || '',
      bookings: userData.bookings || [], // Adjust based on your data structure
      balance: userData.balance || {}, // Include a default empty object if no balance is found
      // Include other properties as per the AppUser interface
    };
    return userDetails;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};