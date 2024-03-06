import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { useAppData } from '../contexts/AppDataContext';
import { Class } from '../types/types';
import auth from '@react-native-firebase/auth';


const HomeScreen: React.FC = () => {
  const { venues, fetchClassesForVenue } = useAppData();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const handleSelectVenue = async (venueId: string) => {
    setSelectedVenueId(venueId);
    try {
      const fetchedClasses = await fetchClassesForVenue(venueId);
      setClasses(fetchedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setClasses([]);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Optionally, navigate to the login screen or perform other actions upon logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
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

// Update your styles to include the logoutButton style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoutButton: {
    alignSelf: 'flex-end', // Align the button to the right
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
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
