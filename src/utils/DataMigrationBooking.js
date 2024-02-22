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
  
    // Include venueId in the class document
    await classRef.set({
      ...classData,
      venueId: venueId, // Explicitly include venueId here
    });
  
    console.log(`Class '${classItem.name}' migrated with venueId '${venueId}'.`);
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
    const { id, userId, classId, venueId, ...bookingData } = booking;
    const classRef = firestore().collection('venues').doc(venueId).collection('classes').doc(classId);
    const bookingRef = firestore().collection('users').doc(userId).collection('bookings').doc(id);
    await bookingRef.set({
      ...bookingData,
      classRef: classRef, // Firestore document reference to the class
      venueId: venueId // Directly include venueId for easy access
    });
    console.log(`Booking '${id}' for class '${classId}' by user '${userId}' migrated.`);
  }



  console.log('Migration completed.');
};

const DataMigration = () => (
  <View>
    <Button title="Migrate Data to Firestore" onPress={migrateDataToFirestore} />
  </View>
);

export default DataMigration;
