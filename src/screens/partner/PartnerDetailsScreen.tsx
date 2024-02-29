import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Venue } from '../../types/types';
import { fetchVenueById } from '../../services/firestoreService';
import {decodePlusCode} from '../../utils/decodePlusCode'; // Use your decodePlusCode function

type PartnerDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PartnerDetails'>;
  route: RouteProp<RootStackParamList, 'PartnerDetails'>;
};

const PartnerDetailsScreen: React.FC<PartnerDetailsScreenProps> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { venueId } = route.params;

  useEffect(() => {
    const loadVenueAndCoordinates = async () => {
      try {
        const fetchedVenue = await fetchVenueById(venueId);
        if (fetchedVenue && fetchedVenue.PlusCode) {
          setVenue(fetchedVenue);
          const coords = await decodePlusCode(fetchedVenue.PlusCode);
          if (coords) {
            setCoordinates(coords);
          } else {
            console.error("Failed to fetch coordinates for venue Plus Code.");
            setCoordinates(null);
          }
        } else {
          console.error("Venue details or Plus Code not available.");
          setVenue(fetchedVenue); // Still set the venue even if Plus Code is missing
          setCoordinates(null); // No coordinates to display
        }
      } catch (error) {
        console.error('Error fetching venue details or decoding Plus Code:', error);
        setVenue(null);
        setCoordinates(null);
      } finally {
        setLoading(false);
      }
    };

    loadVenueAndCoordinates();
  }, [venueId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!venue) {
    return <Text>Venue details not available.</Text>;
  }

  const handleEditVenue = () => {
    navigation.navigate('PartnerVenueEdit', { venueId }); // Ensure 'PartnerVenueEdit' is correctly defined in your navigation stack
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type.join(', ')}</Text>
        <Text style={styles.rating}>Rating: {venue.rating}</Text>
        <Text style={styles.distance}>Distance: {venue.distance} meters</Text>
        <Text style={styles.description}>{venue.description}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditVenue}>
          <Text style={styles.editButtonText}>Edit Venue Details</Text>
        </TouchableOpacity>
      </View>
      {coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...coordinates,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={true}
          zoomEnabled={true}
        >
          <Marker
            coordinate={coordinates}
            title={venue.name}
          />
        </MapView>
      )}
      <Text style={styles.description}>{venue.address}</Text>
    </ScrollView>
  );
};


// Define or adjust styles here. You can reuse styles from GymDetailScreen as needed
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
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF', // Use your app's color scheme
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerDetailsScreen;
