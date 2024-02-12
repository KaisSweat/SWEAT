import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import { Class, RootStackParamList, Venue } from '../types/types';
import { fetchClassesForVenue, fetchVenueById } from '../services/firestoreService';

// Define the expected route parameters for this screen
type ClassesListForVenueRouteProp = RouteProp<RootStackParamList, 'ClassesListForVenue'>;

const ClassesListForVenue: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<ClassesListForVenueRouteProp>();
  const venueId = route.params.venueId;

  useEffect(() => {
    loadClassesAndVenue();
  }, [venueId]);

  const loadClassesAndVenue = async () => {
    if (venueId) {
      setRefreshing(true);
      try {
        const venue = await fetchVenueById(venueId); // Fetch venue details
        const fetchedClasses = await fetchClassesForVenue(venueId);
        // Add venue data to each class
        const classesWithVenue = fetchedClasses.map(classItem => ({
          ...classItem,
          venue: venue, // Assuming your Class type has a venue property
        }));
        setClasses(classesWithVenue);
      } catch (error) {
        console.error('Error fetching classes and venue:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onRefresh = async () => {
    await loadClassesAndVenue();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClassCard classInfo={item} onPress={() => {}} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ClassesListForVenue;
