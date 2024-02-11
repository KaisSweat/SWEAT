// src/components/VenueCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Venue } from '../types/types'; // Ensure this import path is correct

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 250;

type VenueCardProps = {
  venue: Venue;
  onPress: () => void;
};

const VenueCard: React.FC<VenueCardProps> = ({ venue, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: venue.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{venue.name}</Text>
      {/* Other venue details */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  details: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});

export default VenueCard;
