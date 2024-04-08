// src/services/firestoreService.ts
import firestore from '@react-native-firebase/firestore';
import { Venue, Class ,ItemData,Item} from '../types/types';



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
export const fetchClassesForVenue = async (venueId: string): Promise<(Class & { venueName?: string; venueArea?: string })[]> => {
  try {
      // First, fetch the venue details
      const venueRef = firestore().collection('venues').doc(venueId);
      const venueSnap = await venueRef.get();
      if (!venueSnap.exists) {
          console.error(`Venue with ID ${venueId} not found`);
          throw new Error(`Venue with ID ${venueId} not found`);
      }
      const venueData = venueSnap.data();

      // Then, fetch the classes for this venue
      const classesSnapshot = await venueRef.collection('classes').get();
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
              venueName: venueData?.name, // Include venue name
              venueArea: venueData?.area, // Include venue area
              venueImage: venueData?.image,
              venuePlusCode: venueData?.PlusCode,
              venueAdress: venueData?.address,
          } as Class & { venueName?: string; venueArea?: string, venueImage:string,venuePlusCode:string,venueAdress:string  };
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

export const fetchAllClasses = async (): Promise<(Class & { venueName?: string; venueArea?: string })[]> => {
  try {
    const venuesSnapshot = await firestore().collection('venues').get();
    let allClasses: (Class & { venueName?: string; venueArea?: string })[] = [];

    for (const venueDoc of venuesSnapshot.docs) {
      const venueId = venueDoc.id;
      const venueData = venueDoc.data();
      const classesSnapshot = await firestore().collection('venues').doc(venueId).collection('classes').get();

      const classes = classesSnapshot.docs.map(doc => {
        const classData = doc.data();
        return {
          id: doc.id,
          name: classData.name,
          startTime: toDate(classData.startTime),
          endTime: toDate(classData.endTime),
          coach: classData.coach,
          description: classData.description,
          availableSpots: classData.availableSpots,
          venueId: venueId,
          venueName: venueData.name, // Assuming venueData has a name field
          venueArea: venueData.area, // Assuming venueData has an area field
          bookingDeadline: toDate(classData.bookingDeadline),
          checkInStart: toDate(classData.checkInStart),
          checkInEnd: toDate(classData.checkInEnd),
          cancellationDeadline: toDate(classData.cancellationDeadline),
          // Ensure all other required Class properties are included
        } as Class & { venueName?: string; venueArea?: string };
      });

      allClasses = [...allClasses, ...classes];
    }

    return allClasses;
  } catch (error) {
    console.error("Error fetching all classes with venue info:", error);
    throw new Error("Error fetching all classes with venue info");
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


export const updateVenueDetails = async (venueId: string, venueData: Partial<Venue>): Promise<void> => {
  console.log(`Attempting to update venue with ID: ${venueId}`, venueData);
  try {
    await firestore().collection('venues').doc(venueId).update(venueData);
    console.log(`Successfully updated venue with ID: ${venueId}`);
  } catch (error) {
    console.error(`Failed to update venue with ID: ${venueId}`, error);
    // Log the error details if available
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    throw error; // Ensure the error can be caught and handled where the function is called
  }
};


export const updateVenueImage = async (venueId: string, imageUrl: string): Promise<void> => {
  console.log(`Attempting to update image for venue with ID: ${venueId} with new image URL: ${imageUrl}`);
  try {
    await firestore().collection('venues').doc(venueId).update({ image: imageUrl });
    console.log(`Successfully updated image for venue with ID: ${venueId}`);
  } catch (error) {
    console.error(`Failed to update image for venue with ID: ${venueId}. Error: ${error}`);
    // Additional error handling or user feedback code here
  }
};




export const addClassToVenue = async (venueId: string, classData: Omit<Class, 'id'>) => {
  try {
      const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc();
      await classRef.set({
          ...classData,
          startTime: firestore.Timestamp.fromDate(new Date(classData.startTime)),
          endTime: firestore.Timestamp.fromDate(new Date(classData.endTime)),
          bookingDeadline: firestore.Timestamp.fromDate(new Date(classData.bookingDeadline)),
          checkInStart: firestore.Timestamp.fromDate(new Date(classData.checkInStart)),
          checkInEnd: firestore.Timestamp.fromDate(new Date(classData.checkInEnd)),
          cancellationDeadline: firestore.Timestamp.fromDate(new Date(classData.cancellationDeadline)),
      });
      console.log("New class added successfully to venue:", venueId);
  } catch (error) {
      console.error(`Error adding new class to venue ${venueId}:`, error);
      throw new Error(`Error adding new class to venue: ${error}`);
  }
};

export const cancelClass = async (venueId: string, classId: string): Promise<void> => {
  try {
    await firestore()
      .collection('venues')
      .doc(venueId)
      .collection('classes')
      .doc(classId)
      .delete();

    console.log(`Class with ID: ${classId} from venue: ${venueId} has been cancelled and removed.`);
  } catch (error) {
    console.error("Error cancelling class: ", error);
    throw new Error("Failed to cancel class. Please try again.");
  }
};










export const fetchItemsForVenue = async (venueId: string): Promise<Item[]> => {
  try {
    const itemsRef = firestore().collection('venues').doc(venueId).collection('items');
    const snapshot = await itemsRef.get();
    const items: Item[] = snapshot.docs.map(doc => {
      const itemData = doc.data();
      // Here, you might need to handle any data transformations or defaults
      // For example, if certain fields are optional in Firestore but required in your type,
      // you may need to provide default values
      return {
        id: doc.id,
        name: itemData.name,
        venueId, // Assuming every item should inherit this venueId
        description: itemData.description || '',
        priceInSweetun: itemData.priceInSweetun,
        stockQuantity: itemData.stockQuantity,
        image: itemData.image,
        categories: itemData.categories || [],
      };
    });
    console.log("Items fetched successfully for venue:", venueId, items);
    return items;
  } catch (error) {
    console.error(`Error fetching items for venue ${venueId}:`, error);
    throw new Error(`Error fetching items for venue: ${error}`);
  }
};
export const addItemToVenue = async (venueId: string, itemData: ItemData) => {
  try {
    const itemRef = firestore().collection('venues').doc(venueId).collection('items').doc();
    await itemRef.set(itemData);
    console.log("New item added successfully to venue:", venueId);
  } catch (error) {
    console.error(`Error adding new item to venue ${venueId}:`, error);
    throw new Error(`Error adding new item to venue: ${error}`);
  }
};
export const updateItemDetails = async (venueId: string, itemId: string, itemData: ItemData) => {
  try {
    await firestore().collection('venues').doc(venueId).collection('items').doc(itemId).update(itemData);
    console.log(`Item with ID: ${itemId} in venue: ${venueId} has been successfully updated.`);
  } catch (error) {
    console.error(`Failed to update item with ID: ${itemId} in venue: ${venueId}. Error: ${error}`);
    throw error;
  }
};
export const removeItemFromVenue = async (venueId: string, itemId: string) => {
  try {
    await firestore().collection('venues').doc(venueId).collection('items').doc(itemId).delete();
    console.log(`Item with ID: ${itemId} from venue: ${venueId} has been removed.`);
  } catch (error) {
    console.error("Error removing item: ", error);
    throw new Error("Failed to remove item. Please try again.");
  }
};
export const fetchItemById = async (venueId: string, itemId: string): Promise<Item | null> => {
  try {
    const itemRef = firestore().collection('venues').doc(venueId).collection('items').doc(itemId);
    const doc = await itemRef.get();
    if (!doc.exists) {
      console.error(`Item with ID: ${itemId} not found in venue: ${venueId}`);
      return null;
    }
    const itemData = doc.data();
    if (!itemData) {
      console.error(`Item data is undefined for ID: ${itemId} in venue: ${venueId}`);
      return null;
    }
    // Assuming all necessary Item fields are present and correctly named in the document.
    return {
      id: doc.id,
      ...itemData,
    } as Item; // Cast to Item type to enforce type checking
  } catch (error) {
    console.error(`Error fetching item with ID ${itemId} from venue ${venueId}:`, error);
    return null;
  }
};