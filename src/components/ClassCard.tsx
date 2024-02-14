import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Class } from '../types/types'; // Ensure this path is correct
import { format } from 'date-fns';

// Utility function to safely parse dates and return a formatted string or fallback
const safeFormatDate = (dateInput: string | number | Date, formatString: string): string => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) { // Check if date is invalid
      throw new Error('Invalid Date');
    }
    return format(date, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};

type ClassCardProps = {
  classInfo: Class;
  onPress: () => void;
};

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, onPress }) => {
  const {
    name,
    startTime,
    endTime,
    venue,
    coach,
    availableSpots,
  } = classInfo;

  const spotsDisplay = availableSpots === 1 ? '1 spot left' : `${availableSpots} spots left`;
  const waitlistDisplay = availableSpots === 0 ? 'Wait list' : spotsDisplay;

  // Use the safeFormatDate utility to format dates
  const formattedStartTime = safeFormatDate(startTime, 'h:mm a');
  const formattedEndTime = safeFormatDate(endTime, 'h:mm a');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.time}>{`${formattedStartTime} - ${formattedEndTime}`}</Text>
        <Text style={styles.spots}>{waitlistDisplay}</Text>
      </View>
      <Text style={styles.className}>{name}</Text>
      <Text style={styles.details}>
        {venue?.name || 'Unknown Venue'} | {venue?.area || 'Unknown Area'} | {coach}
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
