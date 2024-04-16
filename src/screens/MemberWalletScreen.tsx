import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MemberWalletScreen: React.FC = () => {
  const [sweetcoinAmount, setSweetcoinAmount] = useState('');

  const handlePurchase = async () => {
    try {
      const nokAmount = Number(sweetcoinAmount) * 10; // 1 Sweetcoin = 10 NOK
      const response = await fetch('http://your-backend-url/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: nokAmount })
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert("Payment Successful", "Coins added to your wallet.");
      } else {
        Alert.alert("Payment Failed", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Payment Error", "Failed to initiate payment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Sweetcoin Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={sweetcoinAmount}
        onChangeText={setSweetcoinAmount}
      />
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text>Purchase with Vipps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  purchaseButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default MemberWalletScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  purchaseButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SweetunPurchaseScreen;
