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
  PlusCode:string;
  image: string; // Assuming local images are used and imported as numbers
  classes: Class[]; // Array of classes offered by the venue
  qrCodeUrl:string;
};

export type Class = {
  id: string;
  name: string; // Class name
  startTime: Date; // Use Date object for start time of the class
  endTime: Date; // Use Date object for end time of the class
  coach?: string; // Name of the coach
  description: string; // description
  availableSpots: number;
  venueId: string;
  bookingDeadline: Date; // Deadline for booking the class
  checkInStart: Date; // Check-in start time
  checkInEnd: Date; // Check-in end time
  cancellationDeadline: Date; // Deadline to cancel the booking
  venueName?: string; // Optional venue name
  venueArea?: string; // Optional venue area
  venueImage?: string;
  venue?: Venue;
  // ... any other class related properties
};

// Type for the data needed to create a new item
export type ItemData = Omit<Item, 'id'>;

export type Item = {
  id: string;
  name: string;
  venueId: string;
  description?: string;
  priceInSweetun: number; // Assuming all prices are now in SWEETUN credits
  stockQuantity: number;
  image: string; // URL to the item's image.
  categories?: string[]; // Optional categories for the item.
};

export type CreditPurchase = {
  id: string;
  userId: string;
  amount: number; // Amount of SWEETUN credits purchased.
  purchaseTime: Date;
  paymentMethod: string; // This could reference an external payment method if needed.
  status: 'pending' | 'completed' | 'failed';
};
export type CartItem = {
  itemId: string;
  quantity: number;
};

// You might also want to include a Cart type that references these CartItems.
export type Cart = {
  userId: string;
  items: CartItem[];
};
export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalCostInSweetun: number; // Total cost of the order in SWEETUN credits.
  orderTime: Date;
  status: 'pending' | 'completed' | 'cancelled';
};


// Define the RootStackParamList for React Navigation
export type RootStackParamList = {
  GymList: undefined;
  GymDetail: { venueId: string };
  ClassesList: undefined;
  ClassesListForVenue: { venueId: string };
  ItemsListForVenue: { venueId: string };
  ClassDetail: { classDetail: Class };
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  Home:undefined;
  WalletScreen:undefined;
  PaymentSelection: {
    amount: string;
    currency: string;
  };
  PasswordReset: undefined;
  PartnerDashboard: undefined;
  PartnerDetails: undefined;
  PartnerVenueEdit: undefined;
  PartnerItemAdd: undefined;
  PartnerClassAdd: undefined;
  ClassesListForPartner: undefined;
  ClassDetailsForPartner: { classDetail: Class };
  ItemDetail: {
    itemDetail: Item;
  };

};
// Create an array of currency options
export const currencyOptions: Currency[] = ['NOK', 'EURO', 'TND'];

// Define a type for the supported currencies
export type Currency = 'NOK'|'EURO'  | 'TND' | 'SWEETUN';

// Define an interface for the Balance object, using the Currency type for its keys
export type Balance = {
  [key in Currency]?: number;
};

// Update the AppUser interface to include the Balance type
export interface AppUser {
  id: string;
  firstName: string;
  lastName:string;
  email: string;
  bookings: UserBooking[]; // Assuming UserBooking is defined elsewhere
  role: 'Owner' | 'Partner' | 'User';
  venueId?: string | null;
  balance: Balance; // Use the Balance interface here
  // Add other properties as needed
}

// Type for each booking a user makes
export type UserBooking = {
  id: string;
  userId:string;
  classId: string;
  venueId: string;
  status: 'booked' | 'attended' | 'cancelled'; // Including an 'attended' status if you want to track attendance
  bookingTime: Date;
  // Optionally include payment info, etc.
};

// Type for Partner App's user, which is different from the App User
export type PartnerUser = {
  id: string;
  name: string;
  email: string;
  venueId: string; // Assume each partner user is associated with a venue
  // ... additional properties specific to partners
};

// Partner-side representation of a class booking, which might include more details
export type ClassBooking = {
  id: string;
  userId: string; // Reference to the user who made the booking
  classId: string;
  status: 'booked' | 'attended' | 'cancelled';
  bookingTime: Date;
  userCheckInTime?: Date; // Optional: The time the user checked in for the class
  // ... other relevant properties for the partner to manage bookings
};

// Extend the Class type to include a list of bookings for partner app
export type PartnerClass = Class & {
  bookings: ClassBooking[];
};

// Update Venue type for partner app to include classes and bookings
export type PartnerVenue = Venue & {
  classes: PartnerClass[];
};
