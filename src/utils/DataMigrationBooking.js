// src/utils/DataMigration.js
import React from 'react';
import { Button, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import mockData from '../data/mockData'; // Adjust this path as needed

const migrateDataToFirestore = async () => {
  console.log('Migration started');

  // Migrate Venues
  for (const venue of mockData.venues) {
    const { id, ...venueData } = venue; // Destructure to separate id from the rest of venue data
    const venueRef = firestore().collection('venues').doc(id); // Use specific ID for the document
    await venueRef.set(venueData);
    console.log(`Venue '${venue.name}' migrated.`);
  }



  // Migrate Classes with Timestamps
for (const classItem of mockData.classes) {
  const { id, venueId, startTime, endTime, bookingDeadline, checkInStart, checkInEnd, cancellationDeadline, ...classData } = classItem;
  
  const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(id);
  await classRef.set({
    ...classData,
    venueId: venueId, // Include venueId
    startTime: firestore.Timestamp.fromDate(new Date(startTime)),
    endTime: firestore.Timestamp.fromDate(new Date(endTime)),
    bookingDeadline: firestore.Timestamp.fromDate(new Date(bookingDeadline)),
    checkInStart: firestore.Timestamp.fromDate(new Date(checkInStart)),
    checkInEnd: firestore.Timestamp.fromDate(new Date(checkInEnd)),
    cancellationDeadline: firestore.Timestamp.fromDate(new Date(cancellationDeadline)),
  });

  console.log(`Class '${classItem.name}' migrated with Timestamp fields.`);
}

  // Migrate Users
  for (const user of mockData.users) {
    const { id, ...userData } = user;
    const userRef = firestore().collection('users').doc(id);
    await userRef.set(userData);
    console.log(`User '${user.name}' migrated.`);
  }


// Migrate Bookings with Timestamps
for (const booking of mockData.bookings) {
  const { id, userId, classId, venueId, bookingTime, ...bookingData } = booking;
  const bookingRef = firestore().collection('users').doc(userId).collection('bookings').doc(id);

  await bookingRef.set({
    ...bookingData,
    classId:classId, // Firestore document reference
    venueId: venueId, // Include venueId
    userId: userId,
    bookingTime: firestore.Timestamp.fromDate(new Date(bookingTime)),
    // userCheckInTime: firestore.Timestamp.fromDate(new Date(userCheckInTime)), // Uncomment if including check-in time
  });

  console.log(`Booking '${id}' for class '${classId}' by user '${userId}' migrated with Timestamp fields.`);
}


  console.log('Migration completed.');
};

const DataMigration = () => (
  <View>
    <Button title="Migrate Data to Firestore" onPress={migrateDataToFirestore} />
  </View>
);

export default DataMigration;
