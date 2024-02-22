// import React, { useState, useContext, useCallback } from 'react';
// import { Button, Text, View, Alert } from 'react-native';
// import { AppUserContext } from '../contexts/AppUserContext'; // Adjust this path as needed
// import { bookClassForUser, cancelBookingForUser } from '../services/firestorebookingService';
// import { Class } from '../types/types'; // Adjust this path as needed

// interface Props {
//   classDetail: Class;
// }

// const ClassBookingComponent: React.FC<Props> = ({ classDetail }) => {
//   const [bookingStatus, setBookingStatus] = useState<'available' | 'booked'>('available');
//   const { user } = useContext(AppUserContext); // Context to get user data, adjust the import and usage as needed

//   const handleBookClass = useCallback(async () => {
//     try {
//       await bookClassForUser(user.id, classDetail.id, classDetail.venueId);
//       setBookingStatus('booked');
//       Alert.alert("Booked", "You have successfully booked the class.");
//     } catch (error: any) {
//       Alert.alert("Booking Failed", error.message);
//     }
//   }, [user.id, classDetail.id, classDetail.venueId]);

//   const handleCancelBooking = useCallback(async () => {
//     // The bookingId should be retrieved when fetching bookings for the user
//     // This is a placeholder, you need to replace it with actual bookingId logic
//     const bookingId = "placeholder-booking-id";
//     try {
//       await cancelBookingForUser(user.id, bookingId, classDetail.venueId, classDetail.id);
//       setBookingStatus('available');
//       Alert.alert("Cancelled", "Your booking has been cancelled.");
//     } catch (error: any) {
//       Alert.alert("Cancellation Failed", error.message);
//     }
//   }, [user.id, classDetail.venueId, classDetail.id]);

//   return (
//     <View>
//       {bookingStatus === 'available' && classDetail.availableSpots > 0 ? (
//         <Button title="Book Class" onPress={handleBookClass} />
//       ) : (
//         <Button title="Cancel Booking" onPress={handleCancelBooking} />
//       )}
//       <Text>Available spots: {classDetail.availableSpots}</Text>
//     </View>
//   );
// };

// export default ClassBookingComponent;
