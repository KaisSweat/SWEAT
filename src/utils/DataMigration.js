// src/components/DataMigration.js
import React from 'react';
import { Button, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import mockData from '../data/mockDataFirestore'; // Make sure this path is correct

const migrateDataToFirestore = async () => {
  console.log('Migration started');

  for (const venue of mockData) {
    const { classes, ...venueData } = venue;

    try {
      // Add the venue, Firestore auto-generates the document ID
      const docRef = await firestore().collection('venues').add(venueData);
      console.log(`Venue added with auto-generated ID: ${docRef.id}`);

      // Add classes for the venue
      for (const classItem of classes) {
        // Firestore auto-generates the ID for each class
        const classRef = await docRef.collection('classes').add(classItem);
        console.log(`Class added with auto-generated ID: ${classRef.id}`);
      }
    } catch (error) {
      console.error("Error in migration:", error);
      break; // Exit the loop on the first error
    }
  }

  console.log('Migration completed');
};

const DataMigration = () => (
  <View>
    <Button title="Migrate Data to Firestore" onPress={migrateDataToFirestore} />
  </View>
);

export default DataMigration;
