// import React, { useState, useEffect } from 'react';
// import { View, TextInput, StyleSheet, Button, ScrollView, Alert, Text, ActivityIndicator } from 'react-native';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Venue, RootStackParamList } from '../../types/types'; // adjust import paths as needed
// import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService'; // adjust import paths as needed

// type PartnerVenueEditRouteProp = RouteProp<RootStackParamList, 'PartnerVenueEdit'>;
// type PartnerVenueEditNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerVenueEdit'>;

// type Props = {
//   route: PartnerVenueEditRouteProp;
//   navigation: PartnerVenueEditNavigationProp;
// };

// const PartnerVenueEditScreen: React.FC<Props> = ({ route, navigation }) => {
//   const [venue, setVenue] = useState<Venue | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { venueId } = route.params;

//   useEffect(() => {
//     setIsLoading(true);
//     const loadVenueDetails = async () => {
//       try {
//         const fetchedVenue = await fetchVenueById(venueId);
//         setVenue(fetchedVenue);
//       } catch (error) {
//         console.error('Error fetching venue details:', error);
//         Alert.alert('Error', 'Could not load venue details.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadVenueDetails();
//   }, [venueId]);

//   const handleUpdate = async () => {
//     setIsLoading(true);
//     if (venue) {
//       try {
//         await updateVenueDetails(venueId, venue);
//         Alert.alert('Success', 'Venue details updated successfully.');
//         navigation.goBack();
//       } catch (error) {
//         console.error('Error updating venue details:', error);
//         Alert.alert('Error', 'Could not update venue details.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (isLoading && !venue) {
//     return <ActivityIndicator size="large" style={styles.loader} />;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.label}>Name </Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setVenue(venue ? { ...venue, name: text } : null)}
//         value={venue?.name}
//         placeholder="Enter venue name"
//       />
//       <Text style={styles.label}>Description </Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setVenue(venue ? { ...venue, description: text } : null)}
//         value={venue?.description}
//         placeholder="Enter description"
//       />
//       <Text style={styles.label}>Address </Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setVenue(venue ? { ...venue, address: text } : null)}
//         value={venue?.address}
//         placeholder="Enter full address"
//       />
//       <Text style={styles.label}>Area </Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setVenue(venue ? { ...venue, area: text } : null)}
//         value={venue?.area}
//         placeholder="Enter area"
//       />
//       <Text style={styles.label}>PlusCode for Google Maps</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setVenue(venue ? { ...venue, PlusCode: text } : null)}
//         value={venue?.PlusCode}
//         placeholder="Enter PlusCode"
//       />
//       {isLoading ? (
//         <ActivityIndicator color="#0000ff" />
//       ) : (
//         <Button title="Update Venue" onPress={handleUpdate} disabled={isLoading} />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   label: {
//     marginTop: 10,
//     marginBottom: 5,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     padding: 10,
//   },
//   loader: {
//     marginVertical: 20,
//   },
// });

// export default PartnerVenueEditScreen;
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, StyleSheet, Button, ScrollView, Alert, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { Venue, RootStackParamList } from '../../types/types'; // Adjust the import paths as needed
// import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService'; // Adjust the import paths as needed
// import { uploadImage } from '../../services/imageUploadService'; // Adjust the import path to your uploadImage service

// type PartnerVenueEditRouteProp = RouteProp<RootStackParamList, 'PartnerVenueEdit'>;
// type PartnerVenueEditNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerVenueEdit'>;

// interface Props {
//   route: PartnerVenueEditRouteProp;
//   navigation: PartnerVenueEditNavigationProp;
// }

// const PartnerVenueEditScreen: React.FC<Props> = ({ route, navigation }) => {
//   const [venue, setVenue] = useState<Venue | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { venueId } = route.params;

//   useEffect(() => {
//     const loadVenueDetails = async () => {
//       setIsLoading(true);
//       try {
//         const fetchedVenue = await fetchVenueById(venueId);
//         setVenue(fetchedVenue);
//       } catch (error) {
//         Alert.alert('Error', 'Could not load venue details.');
//         console.error('Error fetching venue details:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadVenueDetails();
//   }, [venueId]);

//   const handleUpdate = async () => {
//     setIsLoading(true);
//     if (venue) {
//       try {
//         await updateVenueDetails(venueId, venue);
//         Alert.alert('Success', 'Venue details updated successfully.');
//         navigation.goBack();
//       } catch (error) {
//         Alert.alert('Error', 'Could not update venue details.');
//         console.error('Error updating venue details:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleSelectImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, async (response) => {
//         if (response.didCancel) {
//             console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//             console.error('ImagePicker Error: ', response.errorMessage);
//         } else {
//             const image = response.assets ? response.assets[0] : null;
//             if (image) {
//                 try {
//                     const url = await uploadImage(image); // Assuming uploadImage returns the URL of the uploaded image
//                     setVenue(prevState => prevState ? { ...prevState, image: url } : null);
//                     Alert.alert('Success', 'Image uploaded successfully.'); // <-- Success message
//                 } catch (error) {
//                     Alert.alert('Upload error', 'Failed to upload image.');
//                     console.error(error);
//                 }
//             }
//         }
//     });
// };

//   if (isLoading) {
//     return <ActivityIndicator size="large" style={styles.loader} />;
//   }

//   if (!venue) {
//     return <Text>Venue details not available.</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Existing venue detail inputs */}
//       <Button title="Select Image" onPress={handleSelectImage} />
//       {/* Other venue detail inputs and the update button */}
//       <Button title="Update Venue" onPress={handleUpdate} disabled={isLoading} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     marginBottom: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default PartnerVenueEditScreen;
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, ScrollView, Alert, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { launchImageLibrary } from 'react-native-image-picker';
import { Venue, RootStackParamList } from '../../types/types';
import { fetchVenueById, updateVenueDetails } from '../../services/firestoreService';
import { uploadImage,handleImageUploadAndUpdate } from '../../services/imageUploadService';
import firebase from '@react-native-firebase/app';
import firebaseConfig from '../../config/firebaseConfig';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase App initialized");
}

type PartnerVenueEditRouteProp = RouteProp<RootStackParamList, 'PartnerVenueEdit'>;
type PartnerVenueEditNavigationProp = StackNavigationProp<RootStackParamList, 'PartnerVenueEdit'>;

interface Props {
  route: PartnerVenueEditRouteProp;
  navigation: PartnerVenueEditNavigationProp;
}

const PartnerVenueEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { venueId } = route.params;

  useEffect(() => {
    const loadVenueDetails = async () => {
      setIsLoading(true);
      try {
        const fetchedVenue = await fetchVenueById(venueId);
        setVenue(fetchedVenue);
      } catch (error) {
        Alert.alert('Error', 'Could not load venue details.');
        console.error('Error fetching venue details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVenueDetails();
  }, [venueId]);
  const handleUpdate = async () => {
    setIsLoading(true); // Start loading
    if (venue) { // Check if venue is not null
      try {
        // You can directly use venue here since you've already checked it's not null
        const updatedVenueData = {
          name: venue.name,
          description: venue.description,
          address: venue.address,
          area: venue.area,
          PlusCode: venue.PlusCode,
          // Any other properties you want to update
        };
        await updateVenueDetails(venueId, updatedVenueData);
        console.log("Update successful"); // Debugging
        Alert.alert('Success', 'Venue details updated successfully.', [
          {
            text: 'OK',
            onPress: () => {
              console.log("Navigating back"); // Debugging
              navigation.goBack();
            }
          }
        ]);
      } catch (error) {
        console.error('Error updating venue details:', error);
        Alert.alert('Error', 'Could not update venue details.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      // Handle the case where venue is null
      Alert.alert("Error", "No venue data available for update.");
      setIsLoading(false); // Ensure to stop loading even if there's no data
    }
  };
  
  
  
  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const image = response.assets ? response.assets[0] : null;
        if (image && venueId) { // Ensure there is an image and the venue ID is available
          try {
            // Use the new function that handles both upload and Firestore update
            await handleImageUploadAndUpdate(image, venueId);
            
            // Since handleImageUploadAndUpdate already updates Firestore,
            // you don't need to set the venue state here. 
            // However, if you wish to update your local state or UI based on this,
            // you can do so here.
            
            Alert.alert('Success', 'Venue image updated successfully.');
          } catch (error) {
            Alert.alert('Upload error', 'Failed to upload image.');
            console.error(error);
          }
        }
      }
    });
  };
  



  if (!venue) {
    return <Text>Loading venue details...</Text>; // Show a loading message or spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => venue && setVenue({ ...venue, name: text })}
        value={venue?.name}
        placeholder="Enter venue name"
      />
      {/* Repeat the pattern for other fields */}
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => venue && setVenue({ ...venue, description: text })}
        value={venue?.description}
        placeholder="Enter description"
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => venue && setVenue({ ...venue, address: text })}
        value={venue?.address}
        placeholder="Enter full address"
      />
      <Text style={styles.label}>Area:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => venue && setVenue({ ...venue, area: text })}
        value={venue?.area}
        placeholder="Enter area"
      />
      <Text style={styles.label}>PlusCode for Google Maps:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => venue && setVenue({ ...venue, PlusCode: text })}
        value={venue?.PlusCode}
        placeholder="Enter PlusCode"
      />
      <Button title="Update Venue" onPress={handleUpdate} disabled={isLoading || !venue} />
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
  loader: {
    marginTop: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    marginTop: 20, // Give some space above the button
    alignItems: 'center',
    backgroundColor: '#4CAF50', // A nice green
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Keeping the original button style in case it's needed elsewhere
  button: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});


export default PartnerVenueEditScreen;
