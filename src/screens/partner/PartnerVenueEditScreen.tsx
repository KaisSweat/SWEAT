import React, { useContext, useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Venue, RootStackParamList } from '../../types/types';
import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService';
import { handleImageUploadAndUpdate } from '../../services/imageUploadService';
import { StackScreenProps } from '@react-navigation/stack';
import { AppUserContext } from '../../contexts/AppUserContext';

type PartnerVenueEditScreenProps = StackScreenProps<RootStackParamList, 'PartnerVenueEdit'>;

const PartnerVenueEditScreen: React.FC<PartnerVenueEditScreenProps> = ({ navigation }) => {
  const { user } = useContext(AppUserContext); // Accessing user context
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadVenueDetails = async () => {
      if (user?.venueId) {
        try {
          const fetchedVenue = await fetchVenueById(user.venueId);
          setVenue(fetchedVenue);
        } catch (error) {
          Alert.alert('Error', 'Could not load venue details.');
          console.error('Error fetching venue details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadVenueDetails();
  }, [user?.venueId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    if (venue && user?.venueId) { // Ensure venue and user.venueId are both available
      try {
        const updatedVenueData = { ...venue };
        await updateVenueDetails(user.venueId, updatedVenueData); // Use user.venueId directly
        console.log("Update successful");
        Alert.alert('Success', 'Venue details updated successfully.', [
          {
            text: 'OK',
            onPress: () => {
              console.log("Navigating back");
              navigation.goBack();
            }
          }
        ]);
      } catch (error) {
        console.error('Error updating venue details:', error);
        Alert.alert('Error', 'Could not update venue details.');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Error", "No venue data available for update.");
      setIsLoading(false);
    }
  };
  

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (!response.didCancel && !response.errorMessage && response.assets && user?.venueId) {
        const image = response.assets[0];
        try {
          await handleImageUploadAndUpdate(image, user?.venueId);
          Alert.alert('Success', 'Venue image updated successfully.');
        } catch (error) {
          Alert.alert('Upload error', 'Failed to upload image.');
          console.error(error);
        }
      }
    });
  };

  if (!venue) {
    return <Text>Loading venue details...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVenue({ ...venue, name: text })}
        value={venue.name}
        placeholder="Enter venue name"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVenue({ ...venue, description: text })}
        value={venue.description}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVenue({ ...venue, address: text })}
        value={venue.address}
        placeholder="Enter full address"
      />
      <Text style={styles.label}>Area:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVenue({ ...venue, area: text })}
        value={venue.area}
        placeholder="Enter area"
      />
      <Text style={styles.label}>PlusCode for Google Maps:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setVenue({ ...venue, PlusCode: text })}
        value={venue.PlusCode}
        placeholder="Enter PlusCode"
      />
      <Button title="Update Venue" onPress={handleUpdate} disabled={isLoading} />
      <Text style={styles.label}>Venue Image:</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
        <Text style={styles.uploadButtonText}>Select Image</Text>
      </TouchableOpacity>
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
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerVenueEditScreen;
