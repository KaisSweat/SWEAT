// src/services/firestorebookingService.ts
import firestore from '@react-native-firebase/firestore';
import { UserBooking } from '../types/types';


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

// Function to fetch bookings for a specific user
export const fetchBookingsForUser = async (userId: string): Promise<UserBooking[]> => {
  try {
    const bookingsSnapshot = await firestore().collection('users').doc(userId).collection('bookings').get();
    const bookings = bookingsSnapshot.docs.map(doc => {
      const bookingData = doc.data();
      console.log("Booking data:", bookingData);

      // Assume class details are stored directly in the booking or fetched separately
      return {
        id: doc.id,
        userId: userId, // Assuming userId is needed in the booking object
        classId: bookingData.classId,
        venueId: bookingData.venueId,
        status: bookingData.status,
        bookingTime: toDate(bookingData.bookingTime),
      } as UserBooking;
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching user's bookings:", error);
    throw new Error("Error fetching user's bookings");
  }
};

// Function to cancel a booking for a user and increment the available spots for the class
export const cancelBookingForUser = async (userId: string, bookingId: string): Promise<boolean> => {
  try {
    const userBookingRef = firestore().collection('users').doc(userId).collection('bookings').doc(bookingId);

    await firestore().runTransaction(async (transaction) => {
      const userBookingDoc = await transaction.get(userBookingRef);
      if (!userBookingDoc.exists) {
        throw new Error('Booking not found');
      }

      const bookingData = userBookingDoc.data();
      if (!bookingData) {
        throw new Error('No data available for booking');
      }

      const { classId, venueId } = bookingData;
      if (!classId || !venueId) {
        throw new Error('Booking data missing classId or venueId');
      }

      const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);

      // Delete the booking document
      transaction.delete(userBookingRef);

      // Increment the available spots in the class
      transaction.update(classRef, { availableSpots: firestore.FieldValue.increment(1) });
    });

    console.log(`Booking ${bookingId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Failed to delete booking ${bookingId}:`, error);
    return false; // Indicate failure
  }
};





//book class for user
export const bookClassForUser = async (userId: string, classId: string, venueId: string): Promise<boolean> => {
  const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);
  const userBookingsRef = firestore().collection('users').doc(userId).collection('bookings');

  try {
    const existingBookingsSnapshot = await userBookingsRef.where('classId', '==', classId).get();
    if (!existingBookingsSnapshot.empty) {
      // User already has a booking for this class, throw a custom error
      throw new Error('Already booked');
    }

    await firestore().runTransaction(async (transaction) => {
      const classDoc = await transaction.get(classRef);
      if (!classDoc.exists) {
        throw new Error(`Class with ID ${classId} does not exist.`);
      }

      const classData = classDoc.data();
      if (!classData) {
        throw new Error(`No data found for class with ID ${classId}.`);
      }

      const availableSpots = classData.availableSpots;
      if (availableSpots <= 0) {
        throw new Error('Class is full');
      }

      transaction.update(classRef, {
        availableSpots: firestore.FieldValue.increment(-1),
      });

      const bookingRef = userBookingsRef.doc();
      transaction.set(bookingRef, {
        classId,
        venueId,
        userId,
        status: 'booked',
        bookingTime: firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log(`Booking made for class ${classId} by user ${userId}`);
    return true;
  } catch (error) {
    // Rethrow the error to be handled where the function is called
    throw error;
  }
};

