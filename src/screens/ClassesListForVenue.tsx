import React, { useState, useEffect, useCallback } from 'react';
import { View, SectionList, Text, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import { Class, RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppData } from '../contexts/AppDataContext';
import { format, isSameDay, startOfDay, addDays } from 'date-fns';

type ClassesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassesList'>;

const ClassesScreen: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();
  const { fetchAllClasses } = useAppData();

  const loadClasses = useCallback(async () => {
    setRefreshing(true);
    try {
      const fetchedClasses = await fetchAllClasses();
      setClasses(fetchedClasses);
    } catch (error) {
      console.error("Error loading classes:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchAllClasses]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const onRefresh = useCallback(() => {
    loadClasses();
  }, [loadClasses]);

  const handleSelectClass = (selectedClass: Class) => {
    navigation.navigate('ClassDetail', { classDetail: selectedClass });
  };

  const groupClassesByDate = (classesArray: Class[]) => {
    const grouped = classesArray.reduce((acc, classItem) => {
      const dateStr = format(startOfDay(classItem.startTime), 'yyyy-MM-dd');
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(classItem);
      return acc;
    }, {} as Record<string, Class[]>);

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, data]) => ({
      title: date,
      data
    }));
  };

  const classSections = groupClassesByDate(classes);

  return (
    <View style={styles.container}>
      <SectionList
        sections={classSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard classInfo={item} onPress={() => handleSelectClass(item)} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{format(new Date(title), 'EEEE, MMMM do')}</Text>
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  // Add other styles as needed
});

export default ClassesScreen;
