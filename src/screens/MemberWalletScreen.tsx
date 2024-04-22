import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SweetunPurchaseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [sweetcoinAmount, setSweetcoinAmount] = useState('');
  const sweetcoinToTnd = 1; // 1 Sweetcoin = 1 TND
  const sweetcoinToNok = 10; // 1 Sweetcoin = 10 NOK
  const sweetcoinToEuro = 0.33; // 1 Sweetcoin = 0.33 Euro

  const handlePurchase = () => {
    console.log('Purchase initiated');
    try {
      navigation.navigate('PaymentMethodSelection');
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };

  const tndAmount = Number(sweetcoinAmount) * sweetcoinToTnd;
  const nokAmount = Number(sweetcoinAmount) * sweetcoinToNok;
  const euroAmount = Number(sweetcoinAmount) * sweetcoinToEuro; // Calculate Euro amount

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
      <Text>TND Amount: {tndAmount}</Text>
      <Text>NOK Amount: {nokAmount}</Text>
      <Text>Euro Amount: {euroAmount}</Text>
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text>Purchase</Text>
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SweetunPurchaseScreen;
