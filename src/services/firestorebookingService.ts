// src/services/firestorebookingService.ts
import firestore from '@react-native-firebase/firestore';
import { Class, UserBooking,ClassBooking } from '../types/types';


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
    const bookingsPromises = bookingsSnapshot.docs.map(async doc => {
      const bookingData = doc.data();
      console.log("Booking data:", bookingData);

      if (!bookingData.classRef) {
        console.error("Missing classRef in booking data:", bookingData);
        throw new Error("Missing classRef in booking data");
      }

      // Resolve class document reference
      const classSnapshot = await bookingData.classRef.get();
      if (!classSnapshot.exists) {
        console.error(`Class document not found for ref: ${bookingData.classRef.path}`);
        throw new Error(`Class document not found for ref: ${bookingData.classRef.path}`);
      }

      const classData = classSnapshot.data();
      console.log("Class data for booking:", classData);

      const venueId = classData?.venueId;
      if (!venueId) {
        console.error("Missing venueId in class data:", classData);
        throw new Error("Missing venueId in class data");
      }

      return {
        id: doc.id,
        classId: classSnapshot.id, // Use the document ID as the classId
        venueId: venueId,
        status: bookingData.status,
        bookingTime: toDate(bookingData.bookingTime),
        // Include additional class details as needed
        className: classData.name,
        classStartTime: toDate(classData.startTime),
        classEndTime: toDate(classData.endTime),
      } as UserBooking;
    });

    const bookings = await Promise.all(bookingsPromises);
    return bookings;
  } catch (error) {
    console.error("Error fetching user's bookings:", error);
    throw new Error("Error fetching user's bookings");
  }
};

// Function to cancel a booking for a user and increment the available spots for the class
export const cancelBookingForUser = async (userId: string, bookingId: string, venueId: string, classId: string): Promise<void> => {
  const userBookingRef = firestore().collection('users').doc(userId).collection('bookings').doc(bookingId);
  const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);

  await firestore().runTransaction(async (transaction) => {
    const userBookingDoc = await transaction.get(userBookingRef);
    if (!userBookingDoc.exists) {
      throw new Error('Booking not found');
    }

    // Update the booking status to 'cancelled' in user's bookings
    transaction.update(userBookingRef, { status: 'cancelled' });

    // Increment the available spots in the class
    transaction.update(classRef, {
      availableSpots: firestore.FieldValue.increment(1),
    });
  });
};
// Function to fetch bookings for a specific class
export const fetchBookingsForClass = async (venueId: string, classId: string): Promise<ClassBooking[]> => {
  const classBookingsRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId).collection('bookings');
  const snapshot = await classBookingsRef.get();

  const bookings: ClassBooking[] = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ClassBooking; // Assuming ClassBooking is the type for bookings
  });

  return bookings;
};


