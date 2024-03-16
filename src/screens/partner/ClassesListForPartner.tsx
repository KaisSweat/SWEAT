import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ClassCardPartner from '../../components/ClassCardPartner'; // Adjust this import to your structure
import { Class, RootStackParamList } from '../../types/types';
import { fetchClassesForVenue, fetchVenueById, cancelClass } from '../../services/firestoreService'; // Ensure cancelClass is imported
import { AppUserContext } from '../../contexts/AppUserContext';

// Define the expected route parameters for this screen
type ClassesListForVenueRouteProp = RouteProp<RootStackParamList, 'ClassesListForPartner'>;

const ClassesListForPartner: React.FC = () => {
  const { user } = useContext(AppUserContext);
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<ClassesListForVenueRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadClasses();
  }, [user?.venueId]);

  const loadClasses = async () => {
    if (user?.venueId) {
      setRefreshing(true);
      try {
        const fetchedClasses = await fetchClassesForVenue(user.venueId);
        setClasses(fetchedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onRefresh = async () => {
    await loadClasses();
  };

  const handleSelectClass = (selectedClass: Class) => {
    navigation.navigate('ClassDetail', { classDetail: selectedClass });
  };

  const handleCancelClass = async (classId: string) => {
    if (!user?.venueId) {
        Alert.alert("Error", "Venue ID is missing. Cannot cancel class.");
        return;
    }
    // Now user?.venueId is guaranteed to be a string, resolving the TypeScript error.
    try {
        await cancelClass(user.venueId, classId);
        Alert.alert("Success", "Class cancelled successfully!");
        await loadClasses(); // Refresh classes list after cancellation
    } catch (error) {
        console.error("Error cancelling class:", error);
        Alert.alert("Error", "Failed to cancel class. Please try again.");
    }
};


  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCardPartner 
            classInfo={item} 
            onPress={() => handleSelectClass(item)} 
            onCancelClass={() => handleCancelClass(item.id)} 
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ClassesListForPartner;
