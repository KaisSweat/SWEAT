import { GoogleMapsAPIKey } from '../config/config'; // Ensure you have your API key configured
import Geocoder from 'react-native-geocoding';

// Define an interface for the coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

Geocoder.init(GoogleMapsAPIKey); // Initialize the Geocoder with your Google Maps API key

export const decodePlusCode = async (plusCode: string): Promise<Coordinates | null> => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(plusCode)}&key=${GoogleMapsAPIKey}`);
    const json = await response.json();
    if (json.status === 'OK' && json.results.length > 0) {
      const { lat, lng } = json.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      console.error("Failed to decode Plus Code:", json.error_message);
      return null;
    }
  } catch (error) {
    console.error("Error decoding Plus Code:", error);
    return null;
  }
};
