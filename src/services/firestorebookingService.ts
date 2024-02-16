// src/services/firestorebookingService.ts
import firestore from '@react-native-firebase/firestore';
import { Class, UserBooking,ClassBooking } from '../types/types';

// Function to book a class for a user
export const bookClassForUser = async (userId: string, classId: string, venueId: string): Promise<UserBooking> => {
  // Start a Firestore transaction to ensure data consistency
  return firestore().runTransaction(async (transaction) => {
    const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);
    const classDoc = await transaction.get(classRef);

    if (!classDoc.exists) {
      throw new Error('Class not found!');
    }

    const classData = classDoc.data() as Class;
    if (classData.availableSpots <= 0) {
      throw new Error('No spots available!');
    }

    // Decrement the available spots
    transaction.update(classRef, {
      availableSpots: firestore.FieldValue.increment(-1),
    });

    // Create a new booking
    const newBookingRef = firestore().collection('users').doc(userId).collection('bookings').doc();
    const newBooking: UserBooking = {
      id: newBookingRef.id,
      classId,
      status: 'booked',
      bookingTime: new Date(),
    };

    transaction.set(newBookingRef, newBooking);

    return newBooking;
  });
};

// Function to fetch bookings for a user
export const fetchBookingsForUser = async (userId: string): Promise<UserBooking[]> => {
  const bookingsSnapshot = await firestore().collection('users').doc(userId).collection('bookings').get();
  return bookingsSnapshot.docs.map(doc => doc.data() as UserBooking);


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
