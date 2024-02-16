import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Venue } from '../types/types';
import { format, isTomorrow, isValid } from 'date-fns';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type ClassDetailScreenRouteProp = RouteProp<RootStackParamList, 'ClassDetail'>;

type Props = {
  route: ClassDetailScreenRouteProp;
};

// Helper function to safely format dates
const safeFormat = (date: Date | number, formatStr: string): string => {
  return isValid(date) ? format(date, formatStr) : 'N/A';
};

const ClassDetailScreen: React.FC<Props> = ({ route }) => {
  const { classDetail } = route.params;

  const venue: Venue = classDetail.venue || {};
  const startTimeFormatted = safeFormat(classDetail.startTime, 'p');
  const endTimeFormatted = safeFormat(classDetail.endTime, 'p');
  const dayIndicator = isValid(classDetail.startTime) ? (isTomorrow(classDetail.startTime) ? 'Tomorrow' : format(classDetail.startTime, 'EEEE')) : 'Date N/A';
  const bookingDeadlineFormatted = safeFormat(classDetail.bookingDeadline, 'p');
  const checkInStartFormatted = safeFormat(classDetail.checkInStart, 'p');
  const checkInEndFormatted = safeFormat(classDetail.checkInEnd, 'p');
  const cancellationDeadlineFormatted = safeFormat(classDetail.cancellationDeadline, 'p');

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.className}>{classDetail.name}</Text>
        <Text style={styles.classTime}>{`${dayIndicator}, ${startTimeFormatted} - ${endTimeFormatted}`}</Text>
        <Text style={styles.classInfo}>{`${venue.name || ''} | ${venue.area || ''}`}</Text>
        <Text style={styles.classInfo}>{`With ${classDetail.coach}`}</Text>
        <Text style={styles.classDescription}>{classDetail.description}</Text>
        <Text style={styles.availableSpots}>{`${classDetail.availableSpots} spots left`}</Text>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        <Text style={styles.classInfo}>Book until: {bookingDeadlineFormatted}</Text>
        <Text style={styles.classInfo}>Check-in: {checkInStartFormatted} - {checkInEndFormatted}</Text>
        <Text style={styles.classInfo}>Cancel until: {cancellationDeadlineFormatted}</Text>

        {venue.latitude && venue.longitude && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: venue.latitude,
              longitude: venue.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: venue.latitude,
                longitude: venue.longitude,
              }}
              title={venue.name || 'Venue Location'}
            />
          </MapView>
        )}
      </View>
      <Text style={styles.classInfo}>{venue.address}</Text>
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
