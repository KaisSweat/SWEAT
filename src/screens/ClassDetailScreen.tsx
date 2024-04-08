import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Venue } from '../types/types';
import { format } from 'date-fns';
import { AppUserContext } from '../contexts/AppUserContext';
import { bookClassForUser } from '../services/firestorebookingService';
import { fetchVenueById } from '../services/VenueService';
import { decodePlusCode } from '../utils/decodePlusCode'; // Make sure the path to your utility function is correct

type ClassDetailScreenRouteProp = RouteProp<RootStackParamList, 'ClassDetail'>;
type ClassDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassDetail'>;

interface Props {
  route: ClassDetailScreenRouteProp;
  navigation: ClassDetailScreenNavigationProp;
}

const ClassDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { classDetail } = route.params;
  const { user } = useContext(AppUserContext);
  const [isBooking, setIsBooking] = useState(false);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenueData = async () => {
      if (classDetail.venueId) {
        try {
          const venueData = await fetchVenueById(classDetail.venueId);
          setVenue(venueData);
          // Decode PlusCode to get coordinates
          if (venueData && venueData.PlusCode) {
            const coords = await decodePlusCode(venueData.PlusCode);
            if (coords) {
              setCoordinates(coords);
            } else {
              console.error("Failed to fetch coordinates for venue Plus Code.");
              // Optionally, set coordinates to a default or null
              setCoordinates(null);
            }
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch venue details');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVenueData();
  }, [classDetail.venueId]);

  const handleBookClass = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to book a class.');
      return;
    }

    setIsBooking(true);
    try {
      await bookClassForUser(user.id, classDetail.id, classDetail.venueId);
      Alert.alert('Success', 'You have successfully booked the class!');
    } catch (error) {
      Alert.alert('Error', 'Failed to book the class. Please try again later.');
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000FF" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: venue?.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        {/* Class Name */}
        <Text style={styles.className}>{classDetail.name}</Text>
  
        {/* Class Timing */}
        <Text style={styles.classTime}>
          {`${format(new Date(classDetail.startTime), 'EEEE, MMMM do, p')} - ${format(new Date(classDetail.endTime), 'p')}`}
        </Text>
  
        {/* Venue Name and Area */}
        <Text style={styles.classInfo}>
          {`${venue?.name || 'Unknown Venue'} | ${venue?.area || 'Unknown Area'}`}
        </Text>
  

  
        {/* Class Description */}
        <Text style={styles.classDescription}>{classDetail.description}</Text>
  
        {/* Available Spots */}
        <Text style={styles.availableSpots}>
          {`${classDetail.availableSpots} spots available`}
        </Text>

        {/* Coach Name */}
        <Text style={styles.classInfo}>{`Coach: ${classDetail.coach}`}</Text>
  
        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookClass} disabled={isBooking}>
          {isBooking ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.bookButtonText}>Book Now</Text>
          )}
        </TouchableOpacity>
  
        {/* MapView for Venue Location */}
        {coordinates && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
              title={venue?.name || 'Venue Location'}
            />
          </MapView>
        )}
      </View>
      <Text style={styles.classAdress}>{venue?.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  classTime: {
    fontSize: 16,
    marginBottom: 4,
    color: 'grey',
  },
  classInfo: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  classDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: 'gray', // Added for better distinction of the description
  },
  availableSpots: {
    fontSize: 16,
    marginBottom: 8,
    color: 'darkgreen', // Highlighting available spots
  },
  bookButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20, // Increased for spacing from the map or bottom
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  classAdress: {
    fontSize: 14,
    color: "gray",
    marginBottom: 1,
    textAlign: 'center', // This centers the text horizontally
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 20, // Adjusted for better spacing from previous content
  },
});

export default ClassDetailScreen;
