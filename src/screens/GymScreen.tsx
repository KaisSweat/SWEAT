import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import VenueCard from '../components/VenueCard';
import { fetchVenues } from '../services/firestoreService'; // Adjust this path as needed
import { Venue, RootStackParamList } from '../types/types';

const GymScreen: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'GymList'>>();

  useEffect(() => {
    const loadVenues = async () => {
      setRefreshing(true);
      const fetchedVenues = await fetchVenues();
      setVenues(fetchedVenues);
      setRefreshing(false);
    };

    loadVenues();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Re-fetch venues on refresh
    fetchVenues().then(fetchedVenues => {
      setVenues(fetchedVenues);
      setRefreshing(false);
    });
  }, []);

  const handleSelectVenue = (venue: Venue) => {
    // Ensure you pass only the venue ID or necessary data to the GymDetail screen
    navigation.navigate('GymDetail', { venueId: venue.id });
  };

  return (
    <FlatList
      data={venues}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <VenueCard
          venue={item} // Pass the entire venue object
          onPress={() => handleSelectVenue(item)}
        />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={<Text style={styles.emptyMessage}>No venues found.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  emptyMessage: {
    padding: 20,
    textAlign: 'center',
  },
});

export default GymScreen;
