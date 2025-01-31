// src/services/firestoreService.ts
import firestore from '@react-native-firebase/firestore';
import { Venue, Class } from '../types/types';

// Fetch all venues
export const fetchVenues = async (): Promise<Venue[]> => {
  try {
    console.log("Fetching venues from Firestore...");
    const snapshot = await firestore().collection('venues').get();
    const venues = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }) as Venue);
    console.log("Venues fetched successfully:", venues);
    return venues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};

// Fetch classes for a specific venue by its auto-generated ID
export const fetchClassesForVenue = async (venueId: string): Promise<Class[]> => {
  try {
    const classesSnapshot = await firestore()
      .collection('venues')
      .doc(venueId)
      .collection('classes')
      .get();

    const classes = classesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }) as Class);

    return classes; // Return classes array
  } catch (error) {
    console.error(`Error fetching classes for venue ${venueId}:`, error);
    throw new Error(`Error fetching classes for venue ${venueId}: ${error}`);
  }
};

// Fetch a single venue by its ID
export const fetchVenueById = async (venueId: string): Promise<Venue> => {
  try {
    console.log(`Fetching venue details for ID: ${venueId} from Firestore...`);
    const docRef = firestore().collection('venues').doc(venueId);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const venue = { id: docSnap.id, ...docSnap.data() } as Venue;
      console.log(`Venue details fetched successfully for ID: ${venueId}`, venue);
      return venue;
    } else {
      throw new Error(`Venue with ID: ${venueId} not found`);
    }
  } catch (error) {
    console.error(`Error fetching venue with ID: ${venueId}:`, error);
    throw error; // Propagate the error
  }
};
