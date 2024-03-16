import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SectionList,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ClassCard from "../components/ClassCard";
import { Class, RootStackParamList } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppData } from "../contexts/AppDataContext";
import { format, addDays, isSameDay, startOfDay } from "date-fns";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
type ClassesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ClassesList"
>;

const ClassesScreen: React.FC = () => {
  const [allClasses, setAllClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Start with no date selected
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<ClassesScreenNavigationProp>();
  const { fetchAllClasses } = useAppData();

  const loadClasses = async () => {
    setRefreshing(true);
    try {
      const fetchedClasses = await fetchAllClasses();
      setAllClasses(fetchedClasses);
      setFilteredClasses(fetchedClasses);
    } catch (error) {
      console.error("Error loading classes:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadClasses();
      // No cleanup action needed
    }, [])
  );

  const onRefresh = async () => {
    await loadClasses();
  };

  const handleSelectClass = (selectedClass: Class) => {
    navigation.navigate("ClassDetail", { classDetail: selectedClass });
  };

  const dateOptions = Array.from({ length: 7 }, (_, i) =>
    addDays(new Date(), i)
  ); // Next 7 days

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const filtered = allClasses.filter((classItem) =>
      isSameDay(classItem.startTime, date)
    );
    setFilteredClasses(filtered);
  };
  // ... (other parts of the component remain unchanged)

  // Function to group classes by their start date
  const groupClassesByDate = (classesArray: Class[]) => {
    const groups = classesArray.reduce((acc, classItem) => {
      const dateStr = format(startOfDay(classItem.startTime), "yyyy-MM-dd");
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

  // Call groupClassesByDate and store the result in state
  const classSections = groupClassesByDate(filteredClasses);

  // ... (other parts of the component remain unchanged)

  return (
    <View style={styles.container}>
      <View style={styles.dateFilterContainer}>
        {dateOptions.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateOption,
              selectedDate &&
                isSameDay(selectedDate, date) &&
                styles.selectedDateOption,
            ]}
            onPress={() => handleDateChange(date)}
          >
            <Text style={styles.dateOptionText}>
              {format(date, "EEE")}
              {"\n"}
              {format(date, "d")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SectionList
        sections={classSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClassCard classInfo={item} onPress={() => handleSelectClass(item)} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>
            {format(new Date(title), "EEEE, MMMM do")}
          </Text>
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 10 },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  dateOption: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  selectedDateOption: {
    backgroundColor: "#007bff",
  },
  dateOptionText: {
    textAlign: "center",
    color: "gray",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#f7f7f7",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ececec",
    color: "gray",
  },
  textColor: { color: "gray" },
  // Add other styles as needed
});

export default ClassesScreen;
