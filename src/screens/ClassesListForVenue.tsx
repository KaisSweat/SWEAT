import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import ClassCard from '../components/ClassCard';
import { Class, RootStackParamList } from '../types/types'; // Ensure these imports are correct
import { fetchClassesForVenue, fetchVenueById } from '../services/firestoreService';

// Define the expected route parameters for this screen
type ClassesListForVenueRouteProp = RouteProp<RootStackParamList, 'ClassesListForVenue'>;

const ClassesListForVenue: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<ClassesListForVenueRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Correctly type the useNavigation hook
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

  const handleSelectClass = (selectedClass: Class) => {
    navigation.navigate('ClassDetail', { classDetail: selectedClass }); // This should now work without TypeScript errors
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard classInfo={item} onPress={() => handleSelectClass(item)} />
        )}
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
