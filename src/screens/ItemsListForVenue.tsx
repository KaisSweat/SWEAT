import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ItemCard from '../components/ItemCard'; // Ensure this is the correct path
import { Item, RootStackParamList } from '../types/types'; // Confirm the Item type is correctly defined
import { fetchItemsForVenue } from '../services/VenueService'; // Adjust according to your actual service file

// Adjust the route prop to match the new screen's requirements
type ItemsListForVenueRouteProp = RouteProp<RootStackParamList, 'ItemsListForVenue'>;

const ItemsListForVenue: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<ItemsListForVenueRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const venueId = route.params.venueId; // Ensure you're correctly accessing venueId from the route params

  useEffect(() => {
    const loadItems = async () => {
      if (!venueId) return;
      setRefreshing(true);
      try {
        const fetchedItems = await fetchItemsForVenue(venueId);
        setItems(fetchedItems);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch items.');
        console.error('Error fetching items:', error);
      } finally {
        setRefreshing(false);
      }
    };

    loadItems();
  }, [venueId]);

  const handleSelectItem = (selectedItem: Item) => {
    // Assuming 'ItemDetail' is a defined route in your RootStackParamList
    // and it expects a parameter named 'itemDetail'
    navigation.navigate('ItemDetail', { itemDetail: selectedItem });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard itemInfo={item} onPress={() => handleSelectItem(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Define additional styles if necessary
});

export default ItemsListForVenue;
