// src/utils/DataMigration.js
import React from 'react';
import { Button, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import mockData from '../data/mockDataFirestore'; // Make sure this path is correct

const migrateDataToFirestore = async () => {
  console.log('Migration started');

  for (const venue of mockData) {
    console.log(`Processing venue: ${venue.name}`);
    const { classes, ...venueData } = venue;

    try {
      const docRef = await firestore().collection('venues').add(venueData);
      console.log(`Venue '${venue.name}' added with auto-generated ID: ${docRef.id}`);

      for (const classItem of classes) {
        console.log(`Adding class '${classItem.name}' for venue '${venue.name}'`);
        const classRef = await docRef.collection('classes').add(classItem);
        console.log(`Class '${classItem.name}' added with auto-generated ID: ${classRef.id}`);
      }
    } catch (error) {
      console.error(`Error in migration for venue '${venue.name}':`, error);
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
