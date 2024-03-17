import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // Ensure you have moment installed for formatting

interface TimeInputFieldProps {
  label: string;
  initialTime: Date;
  onTimeSelected: (time: Date) => void;
}

const TimeInputField: React.FC<TimeInputFieldProps> = ({
  label,
  initialTime,
  onTimeSelected,
}) => {
  const [time, setTime] = useState(initialTime);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedTime?: Date) => {
    setShow(false); // Hide picker after selection
    if (selectedTime) {
      setTime(selectedTime);
      onTimeSelected(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.inputField} 
        onPress={() => setShow(true)}
      >
        {/* Apply the initialTextStyle for the initial time text */}
        <Text style={styles.initialText}>{moment(time).format('HH:mm')}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'grey',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  initialText: {
    color: 'grey', // This style will make the initial time text red
  },
});

export default TimeInputField;
