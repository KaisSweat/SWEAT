import React, { useContext, useState, useEffect } from 'react';
import { View, SectionList, StyleSheet, Text, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ClassCardPartner from '../../components/ClassCardPartner';
import { Class, RootStackParamList } from '../../types/types';
import { fetchClassesForVenue, cancelClass } from '../../services/VenueService';
import { AppUserContext } from '../../contexts/AppUserContext';
import { format, startOfDay } from 'date-fns'; // Assuming date-fns is used for date formatting

// Adjust your Props type if needed
type ClassesListForPartnerProps = StackNavigationProp<RootStackParamList>;

const ClassesListForPartner: React.FC = () => {
  const { user } = useContext(AppUserContext);
  const [classes, setClasses] = useState<Class[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<ClassesListForPartnerProps>();

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
    navigation.navigate('ClassDetailsForPartner', { classDetail: selectedClass });
  };
  

  const handleCancelClass = async (classId: string) => {
    if (!user?.venueId) {
      Alert.alert("Error", "Venue ID is missing. Cannot cancel class.");
      return;
    }
    try {
      await cancelClass(user.venueId, classId);
      Alert.alert("Success", "Class cancelled successfully!");
      await loadClasses(); // Refresh classes list after cancellation
    } catch (error) {
      console.error("Error cancelling class:", error);
      Alert.alert("Error", "Failed to cancel class. Please try again.");
    }
  };

  // Function to group classes by their start date
  const groupClassesByDate = (classesArray: Class[]) => {
    const groups = classesArray.reduce((acc, classItem) => {
      const dateStr = format(startOfDay(classItem.startTime), 'yyyy-MM-dd');
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(classItem);
      return acc;
    }, {} as Record<string, Class[]>);

    return Object.keys(groups)
      .sort()
      .map((date) => ({
        title: date,
        data: groups[date],
      }));
  };

  const classSections = groupClassesByDate(classes);

  return (
    <View style={styles.container}>
      <SectionList
        sections={classSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCardPartner
            classInfo={item}
            onPress={() => handleSelectClass(item)}
            onCancelClass={() => handleCancelClass(item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>
            {format(new Date(title), 'EEEE, MMMM do')}
          </Text>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#333',
  },
});

export default ClassesListForPartner;
