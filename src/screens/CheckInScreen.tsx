import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Camera,useCameraDevice,useCodeScanner} from 'react-native-vision-camera';
import { checkVenueValidity } from '../services/CheckinService';
import { getCurrentLocation,calculateDistanceBetweenCoordinates } from '../services/LocationSerivce';
import { decodePlusCode } from '../utils/decodePlusCode';

// Define props and states interfaces
interface ScannerScreenProps {
  navigation: any; // Specify a more precise type for navigation if needed
}

interface QRCodeData {
  venueId: string;
  venueName: string;
  PlusCode: string;
}

// Define the ScannerScreen component
const CheckInScreen: React.FC<ScannerScreenProps> = ({ navigation }) => {
  // State variables
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState<boolean>(true);


  // Camera permission hooks


  // Get the camera device (back camera)

  
  const device = useCameraDevice('back')

  useEffect(() => {
    async function initialize() {
      // Request Camera Permission
      const cameraPermission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${cameraPermission}`);
      if (cameraPermission === 'denied') {
        await Linking.openSettings();
        return; // Exit if camera permission is denied
      }

      // Fetch Current Location
      try {
        const location = await getCurrentLocation();
        console.log('Current location:', location);
      } catch (error) {
        console.warn('Error fetching location:', (error as Error).message);
        // Handle location error (e.g., permissions not granted)
      }
    }

    initialize();
  }, []);
  // Use the code scanner hook to configure barcode scanning
// Use the code scanner hook to configure barcode scanning
const codeScanner = useCodeScanner({
  codeTypes: ['qr'], // Focusing on QR codes
  onCodeScanned: async (codes) => {
    if (enableOnCodeScanned && codes.length > 0) {
      const firstCode = codes[0]; // Assuming the first code is the one we're interested in

      if (typeof firstCode.value === 'string') {
        try {
          const data: QRCodeData = JSON.parse(firstCode.value);
          if (data.venueId && data.venueName && data.PlusCode) {
            // Check the validity of the venue
            const isValidVenue = await checkVenueValidity(data.venueId, data.venueName, data.PlusCode);// Update function parameters as necessary
            if (isValidVenue) {
              // Venue is valid; now fetch current location and calculate distance
              const currentLocation = await getCurrentLocation();
              const decodedLocation = await decodePlusCode(data.PlusCode);
              if (currentLocation && decodedLocation) {
                const distance = calculateDistanceBetweenCoordinates(currentLocation, decodedLocation);
                Alert.alert("Success", `Valid venue: ${data.venueName}. You are ${distance} meters away.`);
              } else {
                Alert.alert("Error", "Failed to calculate distance. Please try again.");
              }
            } else {
              Alert.alert("Error", "This venue does not exist in our records.");
            }
          } else {
            console.error("QR code data does not contain necessary information");
            Alert.alert("Error", "QR code data does not contain the expected information.");
          }
        } catch (error) {
          console.error("Failed to parse QR code data:", error);
          Alert.alert("Error", "Failed to parse QR code data.");
        }
      } else {
        console.error("No QR code value found");
        Alert.alert("Error", "No QR code value found.");
      }

      // Reset scanning ability
      setEnableOnCodeScanned(false);

      // Optionally, re-enable scanning after a delay
      setTimeout(() => setEnableOnCodeScanned(true), 3000); // Adjust delay as needed
    }
  },
});

  


  // Render content based on camera device availability
  if (device == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ margin: 10 }}>Camera Not Found</Text>
      </View>
    );
  }

  // Return the main component structure
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={torchOn ? 'on' : 'off'}
        onTouchEnd={() => setEnableOnCodeScanned(true)}
      />
    </SafeAreaView>
  );
};


export default CheckInScreen;