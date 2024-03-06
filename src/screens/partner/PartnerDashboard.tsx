import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppUserContext } from '../../contexts/AppUserContext'; // Adjust the import path as needed
import { fetchVenueById } from '../../services/firestoreService'; // Adjust the import path as needed
import { Venue } from '../../types/types';
import auth from '@react-native-firebase/auth'; // Import auth module from Firebase if you're using Firebase for authentication

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
  const { user, setUser } = useContext(AppUserContext);
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const loadVenueDetails = async () => {
      if (user?.venueId) {
        try {
          const fetchedVenue = await fetchVenueById(user.venueId);
          setVenue(fetchedVenue);
        } catch (error) {
          console.error('Error fetching venue details:', error);
        }
      }
    };

    loadVenueDetails();
  }, [user?.venueId]);

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out using Firebase Auth
      setUser(null); // Update your context to reflect the user has logged out
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", "An error occurred while trying to log out.");
    }
  };

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
      <Button title="Log Out" onPress={handleLogout} />
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
