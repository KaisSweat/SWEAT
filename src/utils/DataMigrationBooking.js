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

  // Migrate Classes
  for (const classItem of mockData.classes) {
    const { id, venueId, ...classData } = classItem;
    const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(id);
    await classRef.set(classData);
    console.log(`Class '${classItem.name}' migrated.`);
  }

  // Migrate Users
  for (const user of mockData.users) {
    const { id, ...userData } = user;
    const userRef = firestore().collection('users').doc(id);
    await userRef.set(userData);
    console.log(`User '${user.name}' migrated.`);
  }

  // Migrate Bookings
  for (const booking of mockData.bookings) {
    const { id, userId, classId, ...bookingData } = booking;
    const bookingRef = firestore().collection('users').doc(userId).collection('bookings').doc(id);
    await bookingRef.set({ ...bookingData, classRef: firestore().doc(`classes/${classId}`) }); // Link to class document
    console.log(`Booking for class '${classId}' by user '${userId}' migrated.`);
  }

  console.log('Migration completed.');
};

const DataMigration = () => (
  <View>
    <Button title="Migrate Data to Firestore" onPress={migrateDataToFirestore} />
  </View>
);

export default DataMigration;
