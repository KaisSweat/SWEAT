import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import { Class, RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppData } from '../contexts/AppDataContext'; // Import useAppData

type ClassesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassesList'>;

const ClassesScreen: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();
  const { venues, fetchClassesForVenue } = useAppData(); // Use AppDataContext

  useEffect(() => {
    const loadClasses = async () => {
      setRefreshing(true);
      let allClasses: Class[] = [];
      for (const venue of venues) { // Use venues from AppDataContext
        const venueClasses = await fetchClassesForVenue(venue.id);
        const classesWithVenue = venueClasses.map(c => ({ ...c, venue }));
        allClasses = [...allClasses, ...classesWithVenue];
      }
      setClasses(allClasses);
      setRefreshing(false);
    };

    if (venues.length > 0) { // Load classes only if venues are available
      loadClasses();
    }
  }, [venues]); // Depend on venues from AppDataContext

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Implement the refresh logic, possibly by re-fetching venues from the AppDataContext
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSelectClass = (selectedClass: Class) => {
    navigation.navigate('ClassDetail', { classDetail: selectedClass });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard classInfo={item} onPress={() => handleSelectClass(item)} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 10 },
});

export default ClassesScreen;
