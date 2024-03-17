import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AppUserContext } from '../../contexts/AppUserContext';
import { fetchVenueById } from '../../services/firestoreService';
import { decodePlusCode } from '../../utils/decodePlusCode';
import { Venue } from '../../types/types';



const PartnerDetailsScreen: React.FC<{ }> = ({
}) => {
  const { user } = useContext(AppUserContext);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadVenueDetails();
  }, [user?.venueId]);

  const loadVenueDetails = async () => {
    if (user?.venueId) {
      setLoading(true);
      try {
        const fetchedVenue = await fetchVenueById(user.venueId);
        if (fetchedVenue && fetchedVenue.PlusCode) {
          setVenue(fetchedVenue);
          const coords = await decodePlusCode(fetchedVenue.PlusCode);
          if (coords) {
            setCoordinates(coords);
          } else {
            console.error('Failed to decode PlusCode into coordinates.');
            setCoordinates(null);
          }
        } else {
          console.error('Venue details or PlusCode not available.');
          setVenue(null);
          setCoordinates(null);
        }
      } catch (error) {
        console.error('Error fetching venue details or decoding PlusCode:', error);
        setVenue(null);
        setCoordinates(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVenueDetails();
    setRefreshing(false);
  };

  if (loading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  if (!venue) {
    return <Text style={styles.fallbackText}>Venue details not available.</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode='cover' />
      <View style={styles.details}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type.join(', ')}</Text>
        <Text style={styles.rating}>Rating: {venue.rating}</Text>
        <Text style={styles.distance}>Distance: {venue.distance} meters</Text>
        <Text style={styles.description}>{venue.description}</Text>
      </View>
      {coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
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
    color: 'grey',
    marginBottom: 8,
  },
  distance: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'grey',
    marginBottom: 8,
  },
  map: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fallbackText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

export default PartnerDetailsScreen;
