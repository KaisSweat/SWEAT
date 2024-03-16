import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Class } from '../types/types'; // Ensure this path is correct
import { format } from 'date-fns';

// Utility function to safely parse dates and return a formatted string or fallback
const safeFormatDate = (dateInput: string | number | Date, formatString: string): string => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid Date');
    }
    return format(date, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};

type ClassCardPartnerProps = {
  classInfo: Class;
  onPress: () => void;
  onCancelClass: () => void; // Function to handle class cancellation
};

const ClassCardPartner: React.FC<ClassCardPartnerProps> = ({ classInfo, onPress, onCancelClass }) => {
  const {
    name,
    startTime,
    venueName,
    venueArea,
    endTime,
    coach,
    availableSpots,
  } = classInfo;

  const spotsDisplay = availableSpots === 1 ? '1 spot left' : `${availableSpots} spots left`;
  const waitlistDisplay = availableSpots === 0 ? 'Waitlist' : spotsDisplay;

  const formattedStartTime = safeFormatDate(startTime, 'h:mm a');
  const formattedEndTime = safeFormatDate(endTime, 'h:mm a');

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress}>
      <Text style={styles.className}>{name}</Text>
        <View style={styles.header}>
          <Text style={styles.time}>{`${formattedStartTime} - ${formattedEndTime}`}</Text>
          <Text style={styles.spots}>{waitlistDisplay}</Text>
        </View>
        <Text style={styles.details}>
          {venueName || 'Unknown Venue'} | {venueArea || 'Unknown Area'} | Coach: {coach}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancelClass}>
        <Text style={styles.cancelButtonText}>Cancel Class</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  content: {
    // Styling for the content if needed
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // Increased spacing between the header and class name
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  spots: {
    fontSize: 14,
    color: "darkgreen",
    fontWeight: "bold",
  },
  className: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6, // Increased bottom margin for better visual separation
    color: "black",
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc3545', // Bootstrap danger color for emphasis
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




export default ClassCardPartner;
