import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Venue } from '../types/types'; // Ensure this import path is correct

const CARD_WIDTH = 300; // Adjust width as per your styling needs
const CARD_HEIGHT = 180; // Adjust height as per your styling needs

type VenueCardProps = {
  venue: Venue;
  onPress: () => void;
};

const VenueCard: React.FC<VenueCardProps> = ({ venue, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: venue.image }} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text style={styles.rating}>{venue.rating}</Text>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.details}>{venue.type.join(', ')}</Text>
        <Text style={styles.distance}>{`${venue.distance} m`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  rating: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'orange',
    padding: 3,
    borderRadius: 3,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  details: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  distance: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default VenueCard;
