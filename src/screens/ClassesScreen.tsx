import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import { fetchVenues, fetchClassesForVenue } from '../services/firestoreService'; // Make sure the path is correct
import { Class, RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';

type ClassesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassesList'>;

const ClassesScreen: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();

  useEffect(() => {
    const loadClasses = async () => {
      setRefreshing(true);
      const venues = await fetchVenues();
      let allClasses: Class[] = [];
      for (const venue of venues) {
        const venueClasses = await fetchClassesForVenue(venue.id);
        // Optionally, add venue info to each class if needed
        const classesWithVenue = venueClasses.map(c => ({ ...c, venue }));
        allClasses = [...allClasses, ...classesWithVenue];
      }
      setClasses(allClasses);
      setRefreshing(false);
    };

    loadClasses();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Re-fetch your data here, similar to what's done in useEffect
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSelectClass = (selectedClass: Class) => {
    // Adjust navigation as needed, ensure you have a 'ClassDetail' screen defined
    navigation.navigate('ClassDetail', { classDetail: selectedClass });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard
            classInfo={item}
            onPress={() => handleSelectClass(item)}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ClassesScreen;
