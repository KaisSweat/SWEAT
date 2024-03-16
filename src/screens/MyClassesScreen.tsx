import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SectionList, RefreshControl, Alert } from 'react-native';
import { AppUserContext } from '../contexts/AppUserContext';
import BookingCard from '../components/BookingCard';
import { Class, Venue } from '../types/types';
import { fetchBookingsForUser, cancelBookingForUser } from '../services/firestorebookingService';
import { format, startOfDay } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { fetchVenueById,fetchClassById } from '../services/firestoreService';
// Define the structure of each section in the SectionList
interface Section {
  title: string;
  data: Array<Class & { venue: Venue; bookingId: string }>;
}

const MyClassesScreen: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AppUserContext);

  // Function to load booked classes details
  const loadBookedClassesDetails = async () => {
    if (!user) {
      console.log("No user found, skipping data fetch");
      return;
    }

    setLoading(true);
    try {
      const bookings = await fetchBookingsForUser(user.id);
      const classesDetailsPromises = bookings.map(async (booking) => {
        const classDetail = await fetchClassById(booking.venueId, booking.classId);
        const venueDetail = classDetail ? await fetchVenueById(classDetail.venueId) : null;
        return classDetail && venueDetail ? { ...classDetail, venue: venueDetail, bookingId: booking.id } : null;
      });

      const classesDetails = (await Promise.all(classesDetailsPromises))
        .filter((detail): detail is Class & { venue: Venue; bookingId: string } => detail !== null);
      
      groupAndSetSections(classesDetails);
    } catch (error) {
      console.error("Error loading booked classes details:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh data when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadBookedClassesDetails();
    }, [])
  );

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBookedClassesDetails();
  }, []);

  // Function to group booked classes by date and set sections
  const groupAndSetSections = (classesDetails: Array<Class & { venue: Venue; bookingId: string }>) => {
    const grouped = classesDetails.reduce((acc, classDetail) => {
      const dateStr = format(startOfDay(classDetail.startTime), 'yyyy-MM-dd');
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(classDetail);
      return acc;
    }, {} as Record<string, Array<Class & { venue: Venue; bookingId: string }>>);

    const sectionsArray = Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    })).sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime());

    setSections(sectionsArray);
  };

  // Handler for booking cancellation
  const handleCancelBooking = async (bookingId: string | undefined) => {
    if (!bookingId) {
      Alert.alert("Error", "Invalid booking ID.");
      return;
    }

    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "No" },
      {
        text: "Yes", onPress: async () => {
          setLoading(true);
          const success = await cancelBookingForUser(user?.id ?? '', bookingId);
          if (success) {
            loadBookedClassesDetails();  // Refresh the list after successful cancellation
          } else {
            Alert.alert("Error", "Failed to cancel the booking.");
          }
          setLoading(false);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <BookingCard classDetail={item} onCancel={() => handleCancelBooking(item.bookingId)} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{format(new Date(title), 'EEEE, MMMM do')}</Text>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#f7f7f7',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    alignSelf:"stretch",
  },
  // Additional styles can be added as needed
});

export default MyClassesScreen;
