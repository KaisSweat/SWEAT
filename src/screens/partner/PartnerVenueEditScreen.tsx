import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, Alert,Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Venue,RootStackParamList } from '../../types/types'; // adjust import paths as needed
import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService'; // adjust import paths as needed

type PartnerVenueEditRouteProp = RouteProp<RootStackParamList, 'PartnerVenueEdit'>;
type PartnerVenueEditNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerVenueEdit'>;

type Props = {
  route: PartnerVenueEditRouteProp;
  navigation: PartnerVenueEditNavigationProp;
};


const PartnerVenueEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const { venueId } = route.params;

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        const fetchedVenue = await fetchVenueById(venueId);
        setVenue(fetchedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
        Alert.alert('Error', 'Could not load venue details.');
      }
    };

    loadVenueDetails();
  }, [venueId]);

  const handleUpdate = async () => {
    if (venue) {
      try {
        await updateVenueDetails(venueId, venue);
        Alert.alert('Success', 'Venue details updated successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Error updating venue details:', error);
        Alert.alert('Error', 'Could not update venue details.');
      }
    }
  };

  if (!venue) {
    return <View><Text>Loading...</Text></View>; // Or some loading indicator
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Existing TextInput for name */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue({ ...venue, description: text })}
        value={venue.description}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue({ ...venue, address: text })}
        value={venue.address}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue({ ...venue, area: text })}
        value={venue.area}
        placeholder="Area"
      />
      {/* For type, consider a different input method if it's an array */}
      <Button title="Update Venue" onPress={handleUpdate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  // Add styles for other elements
});

export default PartnerVenueEditScreen;
