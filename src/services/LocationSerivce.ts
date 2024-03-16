

import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import { GoogleMapsAPIKey } from '../config/config'; // Ensure your API key is configured properly
import { decodePlusCode } from '../utils/decodePlusCode';

// Define an interface for coordinates to standardize the data types used
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Initialize the Geocoder with your Google Maps API key
Geocoder.init(GoogleMapsAPIKey);

export const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            // Directly resolve with a Coordinates object
            resolve({
                latitude: location.latitude,
                longitude: location.longitude,
            });
        })
        .catch(error => {
            const { code, message } = error as { code?: string; message?: string };
            console.warn('Location Error', code, message);
            reject(new Error(message || 'Failed to get location'));
        });
    });
};

export const calculateDistanceBetweenCoordinates = (startPos: Coordinates, endPos: Coordinates): number => {
  return getDistance(
    { latitude: startPos.latitude, longitude: startPos.longitude },
    { latitude: endPos.latitude, longitude: endPos.longitude },
  );
};



// Function to calculate the distance between two points
export async function calculateDistanceFromScannedPlusCode(scannedPlusCode: string): Promise<void> {
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
