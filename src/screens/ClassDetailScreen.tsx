import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Venue } from '../types/types'; // Ensure this import path is correct
import { format, isTomorrow } from 'date-fns';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
type ClassDetailScreenRouteProp = RouteProp<RootStackParamList, 'ClassDetail'>;

type Props = {
  route: ClassDetailScreenRouteProp;
};

const ClassDetailScreen: React.FC<Props> = ({ route }) => {
  const { classDetail } = route.params;
  
const venue: Venue = classDetail.venue || {};
const startTimeFormatted = format(classDetail.startTime, 'p');
const endTimeFormatted = format(classDetail.endTime, 'p');
const dayIndicator = isTomorrow(classDetail.startTime) ? 'Tomorrow' : format(classDetail.startTime, 'EEEE');


console.log('Venue Data:', venue);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode="cover" />
        <Text style={styles.className}>{classDetail.name}</Text>
        <Text style={styles.classTime}>{`${dayIndicator}, ${startTimeFormatted} - ${endTimeFormatted}`}</Text>
        <Text style={styles.classInfo}>{`${venue.name } | ${venue.area }`}</Text>
        <Text style={styles.classInfo}>{`With ${classDetail.coach}`}</Text>
        <Text style={styles.classDescription}>{classDetail.description}</Text>
        <Text style={styles.availableSpots}>{`${classDetail.availableSpots} spots left`}</Text>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
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