import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import { AppUserContext } from '../contexts/AppUserContext';
import { fetchClassById, fetchVenueById } from '../services/firestoreService';
import BookingCard from '../components/BookingCard';
import { Class, Venue } from '../types/types';
import { fetchBookingsForUser } from '../services/firestorebookingService';
import { format, startOfDay } from 'date-fns';


interface Section {
  title: string;
  data: Array<Class & { venue: Venue }>;
}

const MyClassesScreen: React.FC = () => {
  const [bookedClassesDetails, setBookedClassesDetails] = useState<Array<Class & { venue: Venue }>>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppUserContext);

  useEffect(() => {
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
          return classDetail && venueDetail ? { ...classDetail, venue: venueDetail } : null;
        });

        const classesDetails = (await Promise.all(classesDetailsPromises)).filter((detail): detail is Class & { venue: Venue } => detail !== null);
        setBookedClassesDetails(classesDetails);
        groupAndSetSections(classesDetails);
      } catch (error) {
        console.error("Error loading booked classes details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookedClassesDetails();
  }, [user]);

  const groupAndSetSections = (classesDetails: Array<Class & { venue: Venue }>) => {
    const grouped = classesDetails.reduce((acc, classDetail) => {
      const dateStr = format(startOfDay(classDetail.startTime), 'yyyy-MM-dd');
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(classDetail);
      return acc;
    }, {} as Record<string, Array<Class & { venue: Venue }>>);
  
    const sectionsArray = Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    }));
  
    setSections(sectionsArray);
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
            <BookingCard
              classDetail={item}
              onCancel={() => console.log('Cancel booking for', item.id)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{format(new Date(title), 'EEEE, MMMM do')}</Text>
          )}
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
  },
  // Add other styles as needed
});

export default MyClassesScreen;
