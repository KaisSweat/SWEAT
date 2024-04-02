import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';

type PaymentSelectionScreenProps = {
  route: RouteProp<RootStackParamList, 'PaymentSelection'>;
};

const PaymentSelectionScreen: React.FC<PaymentSelectionScreenProps> = ({ route }) => {
  const { amount, currency } = route.params;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Amount: {amount}</Text>
      <Text>Currency: {currency}</Text>
      {/* Implementation for rendering payment API options based on 'currency' goes here */}
    </View>
  );
};

export default PaymentSelectionScreen;
