import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppUserContext } from '../../contexts/AppUserContext'; // Adjust the import path as needed
import { fetchVenueById } from '../../services/firestoreService'; // Adjust the import path as needed
import { Venue } from '../../types/types';

type PartnerStackParamList = {
  PartnerDetails: { venueId: string };
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
  // Adjust the useState hook to correctly type the state
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const loadVenueDetails = async () => {
      if (user?.venueId) {
        try {
          const fetchedVenue = await fetchVenueById(user.venueId);
          setVenue(fetchedVenue); // This should now work without error
        } catch (error) {
          console.error('Error fetching venue details:', error);
        }
      }
    };

    loadVenueDetails();
  }, [user?.venueId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Partner Dashboard</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Venue ID: {user?.venueId}</Text>
      <Text>Venue Name: {venue?.name}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          if (user?.venueId) {
            navigation.navigate('PartnerDetails', { venueId: user.venueId });
          } else {
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
    marginBottom: 10,
  },
});

export default PartnerDashboard;
