import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Venue } from '../types/types';
import { format, isTomorrow, isValid } from 'date-fns';
import { AppUserContext } from '../contexts/AppUserContext'; // Make sure the path is correct
import { bookClassForUser } from '../services/firestorebookingService'; // Adjust the path as needed

type ClassDetailScreenRouteProp = RouteProp<RootStackParamList, 'ClassDetail'>;

type Props = {
  route: ClassDetailScreenRouteProp;
};

const ClassDetailScreen: React.FC<Props> = ({ route }) => {
  const { classDetail } = route.params;
  const { user } = useContext(AppUserContext);
  const [isBooking, setIsBooking] = useState(false);

  const handleBookClass = async () => {
    if (!user) {
      Alert.alert("Error", "You need to be logged in to book a class.");
      return;
    }
  
    setIsBooking(true);
    try {
      await bookClassForUser(user.id, classDetail.id, classDetail.venueId);
      setIsBooking(false);
      Alert.alert("Success", "Class booked successfully!");
    } catch (error) {
      setIsBooking(false);
      // Type assertion to Error
      const typedError = error as Error;
      if (typedError.message === 'Already booked') {
        Alert.alert("Already Booked", "You have already booked this class.");
      } else if (typedError.message === 'Class is full') {
        Alert.alert("Class Full", "This class is full. Please try another class.");
      } else {
        Alert.alert("Booking Failed", "Failed to book the class. Please try again later.");
      }
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: classDetail.venue.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.className}>{classDetail.name}</Text>
        <Text style={styles.classTime}>{`${format(classDetail.startTime, 'EEEE, MMMM do, p')} - ${format(classDetail.endTime, 'p')}`}</Text>
        <Text style={styles.classInfo}>{`${classDetail.venue.name || ''} | ${classDetail.venue.area || ''}`}</Text>
        <Text style={styles.classInfo}>{`With ${classDetail.coach}`}</Text>
        <Text style={styles.classDescription}>{classDetail.description}</Text>
        <Text style={styles.availableSpots}>{`${classDetail.availableSpots} spots left`}</Text>
        
        <TouchableOpacity style={styles.bookButton} onPress={handleBookClass} disabled={isBooking}>
          {isBooking ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.bookButtonText}>Book Now</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.classInfo}>Book until: {format(classDetail.bookingDeadline, 'p')}</Text>
        <Text style={styles.classInfo}>Check-in: {format(classDetail.checkInStart, 'p')} - {format(classDetail.checkInEnd, 'p')}</Text>
        <Text style={styles.classInfo}>Cancel until: {format(classDetail.cancellationDeadline, 'p')}</Text>

        {classDetail.venue.latitude && classDetail.venue.longitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: classDetail.venue.latitude,
              longitude: classDetail.venue.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: classDetail.venue.latitude,
                longitude: classDetail.venue.longitude,
              }}
              title={classDetail.venue.name || 'Venue Location'}
            />
          </MapView>
        )}
      </View>
      <Text style={styles.classInfo}>{classDetail.venue.address}</Text>
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
  },
  classTime: {
    fontSize: 18,
    marginBottom: 4,
  },
  classInfo: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  classDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  availableSpots: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 10,
  },
});

export default ClassDetailScreen;
