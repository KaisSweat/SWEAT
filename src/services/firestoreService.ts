// src/services/firestoreService.ts
import firestore from '@react-native-firebase/firestore';
import { Venue, Class } from '../types/types';



const toDate = (value: any): Date | null => {
  if (value?.toDate) { // Check if it's a Firestore Timestamp by checking for the toDate method
    return value.toDate();
  } else if (typeof value === 'string') { // Check if it's an ISO string
    const parsedDate = new Date(value);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  } else {
    return null; // Return null if neither, to handle unexpected formats gracefully
  }
};


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
// Fetch classes for a specific venue by its auto-generated ID
// Fetch classes for a specific venue by its ID
export const fetchClassesForVenue = async (venueId: string): Promise<Class[]> => {
  try {
    const classesSnapshot = await firestore().collection('venues').doc(venueId).collection('classes').get();
    const classes = classesSnapshot.docs.map(doc => {
      const classData = doc.data();
      return {
        id: doc.id,
        ...classData,
        startTime: toDate(classData.startTime),
        endTime: toDate(classData.endTime),
        bookingDeadline: toDate(classData.bookingDeadline),
        checkInStart: toDate(classData.checkInStart),
        checkInEnd: toDate(classData.checkInEnd),
        cancellationDeadline: toDate(classData.cancellationDeadline),
      } as Class;
    });
    return classes;
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

export const fetchAllClasses = async (): Promise<Class[]> => {
  try {
    const venuesSnapshot = await firestore().collection('venues').get();
    let allClasses: Class[] = [];

    for (const venueDoc of venuesSnapshot.docs) {
      const venueId = venueDoc.id;
      const classesSnapshot = await firestore().collection('venues').doc(venueId).collection('classes').get();

      const classes = classesSnapshot.docs.map(doc => {
        const classData = doc.data();
        return {
          id: doc.id,
          ...classData,
          startTime: toDate(classData.startTime),
          endTime: toDate(classData.endTime),
          bookingDeadline: toDate(classData.bookingDeadline),
          checkInStart: toDate(classData.checkInStart),
          checkInEnd: toDate(classData.checkInEnd),
          cancellationDeadline: toDate(classData.cancellationDeadline),
          venueId: venueId,
          venue: venueDoc.data() as Venue,
        } as Class;
      });

      allClasses = [...allClasses, ...classes];
    }

    return allClasses;
  } catch (error) {
    console.error("Error fetching all classes:", error);
    throw new Error("Error fetching all classes");
  }
};

// Fetch a single class by its ID and venue ID
export const fetchClassById = async (venueId: string, classId: string): Promise<Class | null> => {
  try {
    const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);
    const doc = await classRef.get();

    if (!doc.exists) {
      throw new Error(`Class with ID: ${classId} not found in venue: ${venueId}`);
    }

    const classData = doc.data();
    return {
      id: doc.id,
      ...classData,
      startTime: toDate(classData?.startTime),
      endTime: toDate(classData?.endTime),
      bookingDeadline: toDate(classData?.bookingDeadline),
      checkInStart: toDate(classData?.checkInStart),
      checkInEnd: toDate(classData?.checkInEnd),
      cancellationDeadline: toDate(classData?.cancellationDeadline),
      // Include venueId in the class object for reference
      venueId: venueId,
      // If you need the entire venue object, you can fetch it separately using fetchVenueById and include it here
    } as Class;
  } catch (error) {
    console.error(`Error fetching class with ID ${classId} from venue ${venueId}:`, error);
    return null; // Return null or throw the error based on your error handling strategy
  }
};



export const updateVenueDetails = async (venueId: string, venueData: Venue): Promise<void> => {
  await firestore().collection('venues').doc(venueId).update(venueData);
};
