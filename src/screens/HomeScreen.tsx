// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { fetchVenues, fetchClassesForVenue } from '../services/firestoreService';
import { Venue, Class } from '../types/types';

const HomeScreen: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  useEffect(() => {
    const loadVenues = async () => {
      const fetchedVenues = await fetchVenues();
      console.log("Venues fetched:", fetchedVenues);
      setVenues(fetchedVenues);
    };

    loadVenues();
  }, []);

  const handleSelectVenue = async (venueId: string) => {
    setSelectedVenueId(venueId);
    const fetchedClasses = await fetchClassesForVenue(venueId);
    console.log("Venues fetched:", fetchedClasses);
    setClasses(fetchedClasses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venues:</Text>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.venueItem} onPress={() => handleSelectVenue(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedVenueId && (
        <>
          <Text style={styles.title}>Classes for Selected Venue:</Text>
          <FlatList
            data={classes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.classItem}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  venueItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  classItem: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default HomeScreen;
