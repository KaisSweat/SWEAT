import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // Ensure you have moment installed for formatting

interface DateInputFieldProps {
  label: string;
  initialDate: Date;
  onDateSelected: (date: Date) => void;
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  initialDate,
  onDateSelected,
}) => {
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false); // Hide picker after selection
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelected(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.inputField} 
        onPress={() => setShow(true)}
      >
        {/* Apply the initialTextStyle for the initial text */}
        <Text style={styles.initialText}>{moment(date).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
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
    color: 'grey', // This style will make the initial text red
  },
});

export default DateInputField;
