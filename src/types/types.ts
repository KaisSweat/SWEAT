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
  startTime: Date; // Use Date object for start time of the class
  endTime: Date; // Use Date object for end time of the class
  coach: string; // Name of the coach
  description: string; // description
  availableSpots: number;
  venueId: string;
  venue: Venue;
  bookingDeadline: Date; // Deadline for booking the class
  checkInStart: Date; // Check-in start time
  checkInEnd: Date; // Check-in end time
  cancellationDeadline: Date; // Deadline to cancel the booking
  // ... any other class related properties
};
// Define the RootStackParamList for React Navigation
export type RootStackParamList = {
  GymList: undefined;
  GymDetail: { venueId: string };
  ClassesList: { venueId: string };
  ClassesListForVenue: { venueId: string };
  ClassDetail: { classDetail: Class }; // Since classDetail includes venue info, no separate venue param needed
  // Add other screens and their parameters as needed
};