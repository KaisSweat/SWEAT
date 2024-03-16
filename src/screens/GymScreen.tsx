import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import VenueCard from '../components/VenueCard';
import { useAppData } from '../contexts/AppDataContext'; // Import useAppData hook
import { Venue, RootStackParamList } from '../types/types';

const GymScreen: React.FC = () => {
  const { venues } = useAppData(); // Use the venues from context
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'GymList'>>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Since venues are managed by context, you might want to trigger a context update here
    // This could be a context function to re-fetch venues
    // After re-fetching, ensure to setRefreshing to false
    setTimeout(() => setRefreshing(false), 1000); // Placeholder for actual refresh logic
  }, []);

  const handleSelectVenue = (venue: Venue) => {
    // Navigate to GymDetail screen with the selected venue
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
    alignSelf:"stretch",
  },
});

export default GymScreen;
