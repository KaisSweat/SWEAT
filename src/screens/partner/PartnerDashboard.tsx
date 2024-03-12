import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { AppUserContext } from '../../contexts/AppUserContext';
import auth from '@react-native-firebase/auth';
import { fetchVenueById } from '../../services/firestoreService';
import { Venue } from '../../types/types';

const PartnerDashboard = () => {
  const { user, setUser } = useContext(AppUserContext);
  const [venue, setVenue] = React.useState<Venue | null>(null);

  useEffect(() => {
    if (user?.venueId) {
      fetchVenueById(user.venueId).then(fetchedVenue => {
        setVenue(fetchedVenue);
      }).catch(error => {
        console.error('Error fetching venue details:', error);
      });
    }
  }, [user?.venueId]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
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
