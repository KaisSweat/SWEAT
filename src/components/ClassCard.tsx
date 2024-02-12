// src/components/ClassCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Class } from '../types/types'; // Ensure this path is correct

type ClassCardProps = {
  classInfo: Class;
  onPress: () => void;
};

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, onPress }) => {
  const {
    name,
    startTime,
    venue,
    coach,
    availableSpots,
  } = classInfo;

  // Formatting the display of available spots
  const spotsDisplay = availableSpots === 1 ? '1 spot left' : `${availableSpots} spots left`;
  const waitlistDisplay = availableSpots === 0 ? 'Wait list' : spotsDisplay;

  const venueName = venue?.name || 'Unknown Venue';
  const venueArea = venue?.area || 'Unknown Area';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.time}>{startTime}</Text>
        <Text style={styles.spots}>{waitlistDisplay}</Text>
      </View>
      <Text style={styles.className}>{name}</Text>
      <Text style={styles.details}>
        {venueName} | {venueArea} | {coach}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spots: {
    fontSize: 14,
    color: '#666',
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default ClassCard;
