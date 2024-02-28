import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppUserContext } from '../../contexts/AppUserContext'; // Update with the actual path

type PartnerStackParamList = {
  PartnerDetails: { venueId: string };
  // Add other screens and parameters here as needed
};

type PartnerDashboardNavigationProp = StackNavigationProp<
  PartnerStackParamList,
  'PartnerDetails'
>;

type Props = {
  navigation: PartnerDashboardNavigationProp;
};

const PartnerDashboard: React.FC<Props> = ({ navigation }) => {
  const { user } = useContext(AppUserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Partner Dashboard</Text>
      <Text>User ID: {user?.id}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Venue ID: {user?.venueId}</Text>
      <Text>Name: {user?.name}</Text>
      {/* Ensure that user?.venueId is not empty before navigating */}
      <Button
        title="Go to Details"
        onPress={() => {
          if (user?.venueId) {
            navigation.navigate('PartnerDetails', { venueId: user.venueId });
          } else {
            // Handle the case where venueId is not available
            console.warn('Venue ID is not available.');
          }
        }}
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
    marginBottom: 10, // Adjusted for spacing between text elements
  },
});

export default PartnerDashboard;
