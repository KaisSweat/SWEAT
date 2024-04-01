import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { AppUserContext } from '../contexts/AppUserContext';
import WalletService from '../services/WalletServices'; // Make sure this path is correct
import { Picker } from '@react-native-picker/picker'; // Ensure you've installed this package
import { Currency } from '../types/types'; // Adjust based on your project's structure

const WalletScreen = () => {
  const { user } = useContext(AppUserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState({});
  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Default currency
  const [recipients, setRecipients] = useState([]); // Placeholder for recipients list
  const [selectedRecipient, setSelectedRecipient] = useState('');

  const onRefresh = useCallback(async () => {
    // Refresh logic here
  }, []);

  useEffect(() => {
    onRefresh();
    // Here, you would fetch your recipients list
    // This is a placeholder implementation
    setRecipients([
      { id: '1', name: 'Amine' },
      { id: '2', name: 'Azza' },
    ]);
  }, [onRefresh]);

  // Handlers for adding, withdrawing, and sending money
  const handleAddMoney = async () => {
    // Add money logic
  };

  const handleWithdrawMoney = async () => {
    // Withdraw money logic
  };

  const handleSendMoney = async () => {
    // Implement sending money logic
    Alert.alert('Success', 'Money sent successfully.');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your Balance:</Text>
        {/* Display balance here */}
      </View>

      <Picker
        selectedValue={selectedCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
      >
        {/* Currency options */}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Amount to Add"
        keyboardType="numeric"
        value={amountToAdd}
        onChangeText={setAmountToAdd}
      />
      <TouchableOpacity style={styles.actionButton} onPress={handleAddMoney}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Amount to Withdraw"
        keyboardType="numeric"
        value={amountToWithdraw}
        onChangeText={setAmountToWithdraw}
      />
      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawMoney}>
        <Text style={styles.buttonText}>Withdraw Money</Text>
      </TouchableOpacity>

      {/* New UI for sending money */}
      <Picker
        selectedValue={selectedRecipient}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedRecipient(itemValue)}
      >
        {recipients.map((recipient) => (
          <Picker.Item key={recipient.id} label={recipient.name} value={recipient.id} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Amount to Send"
        keyboardType="numeric"
        value={amountToSend}
        onChangeText={setAmountToSend}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
        <Text style={styles.buttonText}>Send Money</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Expanded styles, including new styles for the send button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  balanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalletScreen;
