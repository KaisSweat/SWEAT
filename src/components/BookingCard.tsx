import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Class } from '../types/types'; // Ensure this path is correct
import { format } from 'date-fns';

// Re-use the same safeFormatDate function from ClassCard
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

type BookingCardProps = {
  classDetail: Class; // Contains details about the class, venue, and instructor
  onCancel: () => void; // Function to handle cancellation
};

const BookingCard: React.FC<BookingCardProps> = ({ classDetail, onCancel }) => {
  // Use the safeFormatDate utility to format dates
  const formattedStartTime = safeFormatDate(classDetail.startTime, 'h:mm a');
  const formattedEndTime = safeFormatDate(classDetail.endTime, 'h:mm a');

  // Function to confirm cancellation

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>{`${formattedStartTime} - ${formattedEndTime}`}</Text>
        <Text style={styles.spots}>Booked</Text>
      </View>
      <Text style={styles.className}>{classDetail.name}</Text>
      <Text style={styles.details}>
        {classDetail.venue?.name || 'Unknown Venue'} | {classDetail.coach}
      </Text>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
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
    color:'black'
  },
  spots: {
    fontSize: 14,
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'grey'
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default BookingCard;
