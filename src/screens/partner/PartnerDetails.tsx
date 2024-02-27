import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type PartnerStackParamList = {
  PartnerDashboard: undefined; // Define other screens and parameters here as needed
};

type PartnerDetailsNavigationProp = StackNavigationProp<
  PartnerStackParamList,
  'PartnerDashboard'
>;

type Props = {
  navigation: PartnerDetailsNavigationProp;
};

const PartnerDetails: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Partner Details</Text>
      <Button
        title="Go Back to Dashboard"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PartnerDetails;
