import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type PartnerStackParamList = {
  PartnerDetails: undefined; // Add other parameters here as needed
};

type PartnerDashboardNavigationProp = StackNavigationProp<
  PartnerStackParamList,
  'PartnerDetails'
>;

type Props = {
  navigation: PartnerDashboardNavigationProp;
};

const PartnerDashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Partner Dashboard</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('PartnerDetails')}
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

export default PartnerDashboard;
