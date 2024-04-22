
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PaymentMethodSelectionScreen :React.FC = () => {
const navigation = useNavigation();
const handleVippsSelection = () => {
    navigation.navigate('VippsGuide'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={handleVippsSelection}>
        <Image
          source={require('../../assets/vipps_logo.jpg')} // Replace with actual path to VIPPS logo
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Pay with VIPPS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
  },
  paymentButton: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default PaymentMethodSelectionScreen;
