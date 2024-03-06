import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, Alert, Text, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Venue, RootStackParamList } from '../../types/types'; // adjust import paths as needed
import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService'; // adjust import paths as needed

type PartnerVenueEditRouteProp = RouteProp<RootStackParamList, 'PartnerVenueEdit'>;
type PartnerVenueEditNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerVenueEdit'>;

type Props = {
  route: PartnerVenueEditRouteProp;
  navigation: PartnerVenueEditNavigationProp;
};

const PartnerVenueEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { venueId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    const loadVenueDetails = async () => {
      try {
        const fetchedVenue = await fetchVenueById(venueId);
        setVenue(fetchedVenue);
      } catch (error) {
        console.error('Error fetching venue details:', error);
        Alert.alert('Error', 'Could not load venue details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadVenueDetails();
  }, [venueId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    if (venue) {
      try {
        await updateVenueDetails(venueId, venue);
        Alert.alert('Success', 'Venue details updated successfully.');
        navigation.goBack();
      } catch (error) {
        console.error('Error updating venue details:', error);
        Alert.alert('Error', 'Could not update venue details.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading && !venue) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue(venue ? { ...venue, name: text } : null)}
        value={venue?.name}
        placeholder="Enter venue name"
      />
      <Text style={styles.label}>Description </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue(venue ? { ...venue, description: text } : null)}
        value={venue?.description}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Address </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue(venue ? { ...venue, address: text } : null)}
        value={venue?.address}
        placeholder="Enter full address"
      />
      <Text style={styles.label}>Area </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue(venue ? { ...venue, area: text } : null)}
        value={venue?.area}
        placeholder="Enter area"
      />
      <Text style={styles.label}>PlusCode for Google Maps</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setVenue(venue ? { ...venue, PlusCode: text } : null)}
        value={venue?.PlusCode}
        placeholder="Enter PlusCode"
      />
      {isLoading ? (
        <ActivityIndicator color="#0000ff" />
      ) : (
        <Button title="Update Venue" onPress={handleUpdate} disabled={isLoading} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
  },
  loader: {
    marginVertical: 20,
  },
});

export default PartnerVenueEditScreen;
