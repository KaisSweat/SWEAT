import React, {useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AppUserContext } from '../../contexts/AppUserContext';
import { fetchVenueById } from '../../services/firestoreService';
import {decodePlusCode} from '../../utils/decodePlusCode'; // Use your decodePlusCode function
import { Venue } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types.ts';

type PartnerDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerDetails'>;




const PartnerDetailsScreen: React.FC<{ navigation: PartnerDetailsScreenNavigationProp }> = ({ navigation }) => {
  const { user } = useContext(AppUserContext); // Accessing user context
  const [venue, setVenue] = useState<Venue | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.venueId) {
      const venueIdString = user.venueId!;
      const loadVenueAndCoordinates = async () => {
        setLoading(true);
        try {
          const fetchedVenue = await fetchVenueById(venueIdString);
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
            setVenue(null); // In case there's no venue data
            setCoordinates(null);
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
    }
  }, [user?.venueId]);

  const handleEditVenue = () => {
    if (user?.venueId) {
      navigation.navigate('PartnerVenueEdit');
    }
  };  
  
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!venue) {
    return <Text style={styles.fallbackText}>Venue details not available.</Text>;
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
    color:'black'
  },
  type: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
    color:'grey'
  },
  distance: {
    fontSize: 16,
    marginBottom: 8,
    color:'grey'
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 8,
    color:'grey'
  },
  map: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  showClassesButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF', // Use your app's color scheme
    borderRadius: 5,
    alignItems: 'center',
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
  fallbackText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default PartnerDetailsScreen;
