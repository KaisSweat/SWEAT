import React, { useContext, useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { AppUserContext } from '../contexts/AppUserContext';
import WalletService from '../services/WalletServices'; // Adjust import as necessary
import { fetchUsersByRole } from '../services/firestoreUserService'; // Adjust import as necessary
import { Currency, AppUser ,currencyOptions,RootStackParamList } from '../types/types'; // Adjust import as necessary
import { StackNavigationProp } from '@react-navigation/stack';



type WalletScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Wallet'>;
};

const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const { user } = useContext(AppUserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('EURO');
  const [recipients, setRecipients] = useState<AppUser[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');

  useEffect(() => {
    const loadPartners = async () => {
      console.log('Starting to fetch partners...'); // Log the start of the fetch operation
      try {
        const partners = await fetchUsersByRole('Partner');
        console.log('Fetched Partners:', partners); // Log the fetched partners
        setRecipients(partners);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch partners.");
        console.error("Failed to fetch partners:", error); // Log any errors encountered
      }
    };
  
    loadPartners();
  }, []);

  // Example refresh function (update as needed)
  const onRefresh = async () => {
    console.log('Refreshing data...');
  };

  // Handlers for transaction functionalities
  const handleAddMoney = async () => {
    console.log('Navigating to Payment Selection...');
    // Assuming validation and logic for amountToAdd and selectedCurrency are handled
    navigation.navigate('PaymentSelection', {
      amount: amountToAdd,
      currency: selectedCurrency,
      // Optionally pass available APIs based on the currency or handle it in the PaymentSelectionScreen
    });
  };

  const handleWithdrawMoney = async () => {
    console.log('Withdrawing money...');
    // Implement withdraw money functionality here
  };

  const handleSendMoney = async () => {
    console.log('Sending money...');
    // Implement send money functionality here
    Alert.alert('Success', 'Money sent successfully.');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Display user balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your Balance:</Text>
        {/* Assuming balance display logic is handled elsewhere */}
      </View>

      {/* Currency selection */}
      <Picker
  selectedValue={selectedCurrency}
  style={styles.picker}
  onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
>
  {currencyOptions.map((currency) => (
    <Picker.Item key={currency} label={currency} value={currency} />
  ))}
</Picker>


      {/* Amount to Add */}
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

      {/* Amount to Withdraw */}
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

      {/* Partner selection for sending money */}
      <Picker
  selectedValue={selectedRecipient}
  style={styles.picker}
  onValueChange={(itemValue) => setSelectedRecipient(itemValue)}
>
  {recipients.map((recipient) => (
    // Concatenate firstName and lastName for the label
    <Picker.Item 
      key={recipient.id} 
      label={`${recipient.firstName} ${recipient.lastName}`} 
      value={recipient.id} 
    />
  ))}
</Picker>

      {/* Amount to Send */}
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
