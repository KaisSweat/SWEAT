import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Venue } from '../types/types';
import { fetchVenueById } from '../services/firestoreService';


type GymDetailScreenRouteProp = RouteProp<RootStackParamList, 'GymDetail'>;
type GymDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GymDetail'>;

type Props = {
  route: GymDetailScreenRouteProp;
  navigation: GymDetailScreenNavigationProp;
};

const GymDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const { venueId } = route.params;

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        const fetchedVenue = await fetchVenueById(venueId);
        setVenue(fetchedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    loadVenueDetails();
  }, [venueId]);

  const handleShowClasses = () => {
    if (venue && venue.id) { // Ensure venue and venue.id are available
      // Navigate to the ClassesListForVenue screen and pass the actual venueId
      navigation.navigate('ClassesListForVenue', { venueId: venue.id });
    } else {
      console.error("Venue ID is not available.");
    }
  };
  

  if (!venue) {
    return <Text>Loading venue details...</Text>; // Show a loading message or spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type.join(', ')}</Text>
        <Text style={styles.rating}>Rating: {venue.rating}</Text>
        <Text style={styles.distance}>Distance: {venue.distance} meters</Text>
        <Text style={styles.description}>{venue.description}</Text>
        <TouchableOpacity style={styles.showClassesButton} onPress={handleShowClasses}>
          <Text style={styles.showClassesText}>Show Classes</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: venue.latitude,
          longitude: venue.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker
          coordinate={{ latitude: venue.latitude, longitude: venue.longitude }}
          title={venue.name}
        />
      </MapView>
      <Text style={styles.description}>{venue.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  details: {
    padding: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  type: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  distance: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  showClassesButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF', // Use your app's color scheme
    borderRadius: 5,
    alignItems: 'center',
  },
  showClassesText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GymDetailScreen;
