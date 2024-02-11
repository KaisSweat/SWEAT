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
    endTime,
    duration,
    venue,
    coach,
    availableSpots,
    description
  } = classInfo;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.time}>{`${startTime} - ${endTime}`}</Text>
      </View>
      <Text style={styles.className}>{name}</Text>
      <Text style={styles.details}>
        {`${duration} min | ${venue.name} | ${venue.area} | ${coach}`}
      </Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.availableSpots}>
        {`${availableSpots} spots left`}
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
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  availableSpots: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ClassCard;
