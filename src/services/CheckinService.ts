import firestore from '@react-native-firebase/firestore';
import GetLocation from 'react-native-get-location';
import { decodePlusCode } from '../utils/decodePlusCode';

export const checkVenueValidity = async (venueId: string, venueName: string, PlusCode:string): Promise<boolean> => {
  const venueQuerySnapshot = await firestore()
    .collection('venues')
    .where('id', '==', venueId)
    .where('name', '==', venueName)
    .where('PlusCode', '==', PlusCode)
    .get();

  return !venueQuerySnapshot.empty;
};


// Assuming this is triggered after you've scanned a QR code and obtained a PlusCode

async function calculateDistanceFromScannedPlusCode(scannedPlusCode: string): Promise<void> {
  try {
    // Decode the PlusCode to get venue coordinates
    const venueLocation = await decodePlusCode(scannedPlusCode);
    if (!venueLocation) {
      console.error("Could not decode the Plus Code.");
      return;
    }

    // Get the current location
    const currentLocation = await getCurrentLocation();
    if (!currentLocation) {
      console.error("Could not obtain current location.");
      return;
    }

    // Calculate the distance between the current location and the venue location
    const distance = calculateDistanceBetweenCoordinates(currentLocation, venueLocation);
    console.log(`Distance to venue: ${distance} meters`);

    // Optionally, you can handle the distance value further, such as displaying it to the user
  } catch (error) {
    console.error('Error calculating distance:', error);
  }
}

// Usage example, replace 'scannedPlusCode' with your actual scanned Plus Code
// calculateDistanceFromScannedPlusCode(scannedPlusCode);
