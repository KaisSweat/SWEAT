// src/types/types.ts

// Define the Venue type based on your provided structure
export type Venue = {
  id: string;
  name: string;
  type: string[];
  rating: number;
  distance: number;
  description: string;
  address: string;
  area: string;
  latitude: number;
  longitude: number;
  image: string; // Assuming local images are used and imported as numbers
  classes: Class[]; // Array of classes offered by the venue
};

export type Class = {
  id: string;
  name: string; // Class name
  startTime: string; // Start time of the class
  endTime: string;
  duration: string; // Duration of the class // Change this from string to Venue to hold the entire venue objec
  coach: string; // Name of the coach
  description: string; // description
  availableSpots: number;
  venueId: string;
  venue: Venue;
  // ... any other class related properties
};
// Define the RootStackParamList for React Navigation
export type RootStackParamList = {
  GymList: undefined;
  GymDetail: { venueId: string };
  ClassesList: undefined;
  ClassDetail: { classDetail: Class }; // Since classDetail includes venue info, no separate venue param needed
  // Add other screens and their parameters as needed
};