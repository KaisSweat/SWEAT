import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import { Class, RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppData } from '../contexts/AppDataContext';
import { format } from 'date-fns';

type ClassesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassesList'>;

const ClassesScreen: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [groupedClasses, setGroupedClasses] = useState<Record<string, Class[]>>({});
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();
  const { venues, fetchClassesForVenue } = useAppData();

  useEffect(() => {
    const loadClasses = async () => {
      setRefreshing(true);
      let allClasses: Class[] = [];
      for (const venue of venues) {
        const venueClasses = await fetchClassesForVenue(venue.id);
        const classesWithVenue = venueClasses.map(c => ({ ...c, venue }));
        allClasses = [...allClasses, ...classesWithVenue];
      }
      allClasses.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

      const grouped = allClasses.reduce((acc, current) => {
        const dateStr = format(current.startTime, 'yyyy-MM-dd');
        if (!acc[dateStr]) {
          acc[dateStr] = [];
        }
        acc[dateStr].push(current);
        return acc;
      }, {} as Record<string, Class[]>);

      setGroupedClasses(grouped);
      setRefreshing(false);
    };

    if (venues.length > 0) {
      loadClasses();
    }
  }, [venues]);

  const onRefresh = useCallback(() => {
    // Implement your refresh logic here
  }, []);

  const handleSelectClass = (selectedClass: Class) => {
    // Navigate to ClassDetail with selected class
    navigation.navigate('ClassDetail', { classDetail: selectedClass });
  };

  const renderItem = ({ item }: { item: Class[] }) => (
    <View>
      <Text style={styles.dateHeader}>{format(item[0].startTime, 'EEEE, MMMM do')}</Text>
      {item.map((classItem) => (
        <ClassCard key={classItem.id} classInfo={classItem} onPress={() => handleSelectClass(classItem)} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(groupedClasses)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 10 },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  // Add styles for your date headers if needed
});

export default ClassesScreen;
