import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View,TouchableOpacity,TextInput,Text,  Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList} from '../../types/types';
import { AppUserContext } from '../../contexts/AppUserContext';
import DateInputField from '../../components/DateInputField'; // Adjust the import path as needed
import TimeInputField from '../../components/TimeInputField'; // Make sure this is correctly imported
import {addClassToVenue} from '../../services/VenueService'



type PartnerClassAddScreenProps = StackScreenProps<RootStackParamList, 'PartnerClassAdd'>;

interface ClassDetails {
  className: string;
  description: string;
  coach: string;
  availableSpots: string;
  classDate: Date; // Adding classDate field for DateInputField
  startTime: Date;
  endTime: Date;
  bookingDeadline: Date;
  checkInStart: Date;
  checkInEnd: Date;
  cancellationDeadline: Date;
}


const mergeDateAndTime = (date: Date, time: Date): Date => {
  let dateTime = new Date(date);
  const timeOnly = new Date(time);

  dateTime.setHours(timeOnly.getHours(), timeOnly.getMinutes(), 0, 0);
  return dateTime;
};


const PartnerClassAddScreen: React.FC<PartnerClassAddScreenProps> = ({ route }) => {
  const { user } = useContext(AppUserContext);
  const [classDetails, setClassDetails] = useState<ClassDetails>({
    className: '',
    description: '',
    coach: '',
    availableSpots: '',
    classDate: new Date(), // Initialize classDate for DateInputField
    startTime: new Date(),
    endTime: new Date(),
    bookingDeadline: new Date(),
    checkInStart: new Date(),
    checkInEnd: new Date(),
    cancellationDeadline: new Date(),
  });

  const updateClassDetails = (field: keyof ClassDetails, value: any) => {
    setClassDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!classDetails.className || !classDetails.description || !classDetails.coach || !classDetails.availableSpots || !user?.venueId) {
        Alert.alert('Error', 'Please fill all required fields and ensure a venue is selected.');
        return;
    }

    // Assuming mergeDateAndTime is defined elsewhere in this file
    const mergedStartTime = mergeDateAndTime(classDetails.classDate, classDetails.startTime);
    const mergedEndTime = mergeDateAndTime(classDetails.classDate, classDetails.endTime);
    const mergedBookingDeadline = mergeDateAndTime(classDetails.classDate, classDetails.bookingDeadline);
    const mergedCheckInStart = mergeDateAndTime(classDetails.classDate, classDetails.checkInStart);
    const mergedCheckInEnd = mergeDateAndTime(classDetails.classDate, classDetails.checkInEnd);
    const mergedCancellationDeadline = mergeDateAndTime(classDetails.classDate, classDetails.cancellationDeadline);

    try {
        const { className, description, coach, availableSpots, classDate, ...rest } = classDetails;

        const classData = {
            ...rest,
            name: className,
            description: description,
            coach: coach,
            availableSpots: parseInt(availableSpots, 10),
            venueId: user.venueId,
            startTime: mergedStartTime,
            endTime: mergedEndTime,
            bookingDeadline: mergedBookingDeadline,
            checkInStart: mergedCheckInStart,
            checkInEnd: mergedCheckInEnd,
            cancellationDeadline: mergedCancellationDeadline,
        };

        // Using the addClassToVenue function
        await addClassToVenue(user.venueId, classData);

        Alert.alert('Success', 'Class added successfully!');
    } catch (error) {
        console.error("Error adding class: ", error);
        Alert.alert('Error', 'Could not add class.');
    }
};


return (
  <ScrollView contentContainerStyle={styles.container}>
  <TextInput 
    style={styles.input} 
    placeholder="Class Name" 
    value={classDetails.className} 
    onChangeText={(text) => updateClassDetails('className', text)} 
    placeholderTextColor="#666"
  />
  <TextInput 
    style={styles.input} 
    placeholder="Description" 
    value={classDetails.description} 
    onChangeText={(text) => updateClassDetails('description', text)} 
    placeholderTextColor="#666"
  />
  <TextInput 
    style={styles.input} 
    placeholder="Coach Name" 
    value={classDetails.coach} 
    onChangeText={(text) => updateClassDetails('coach', text)} 
    placeholderTextColor="#666"
  />
  <TextInput 
    style={styles.input} 
    placeholder="Available Spots" 
    value={classDetails.availableSpots} 
    onChangeText={(text) => updateClassDetails('availableSpots', text)} 
    placeholderTextColor="#666" 
    keyboardType="numeric"
  />

    <View style={styles.dateAndTimeContainer}>
      <DateInputField
        label="Select Class Date:"
        initialDate={classDetails.classDate}
        onDateSelected={(date) => updateClassDetails('classDate', date)}
      />
      <TimeInputField
        label="Start Time:"
        initialTime={classDetails.startTime}
        onTimeSelected={(time) => updateClassDetails('startTime', time)}
      />
      <TimeInputField
        label="End Time:"
        initialTime={classDetails.endTime}
        onTimeSelected={(time) => updateClassDetails('endTime', time)}
      />
      <TimeInputField
        label="Booking Deadline:"
        initialTime={classDetails.bookingDeadline}
        onTimeSelected={(time) => updateClassDetails('bookingDeadline', time)}
      />
      <TimeInputField
        label="Check-In Start:"
        initialTime={classDetails.checkInStart}
        onTimeSelected={(time) => updateClassDetails('checkInStart', time)}
      />
      <TimeInputField
        label="Check-In End:"
        initialTime={classDetails.checkInEnd}
        onTimeSelected={(time) => updateClassDetails('checkInEnd', time)}
      />
      <TimeInputField
        label="Cancellation Deadline:"
        initialTime={classDetails.cancellationDeadline}
        onTimeSelected={(time) => updateClassDetails('cancellationDeadline', time)}
      />
    </View>

    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  dateAndTimeContainer: {
    marginVertical: 10, // Provides vertical spacing around the date and time pickers
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PartnerClassAddScreen;

