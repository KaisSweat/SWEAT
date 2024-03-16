import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Class } from "../types/types"; // Ensure this path is correct
import { format } from "date-fns";

// Utility function to safely parse dates and return a formatted string or fallback
const safeFormatDate = (
  dateInput: string | number | Date,
  formatString: string
): string => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      // Check if date is invalid
      throw new Error("Invalid Date");
    }
    return format(date, formatString);
  } catch (error) {
    return "Invalid Date";
  }
};

type ClassCardProps = {
  classInfo: Class;
  onPress: () => void;
};

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, onPress }) => {
  const {
    name,
    startTime,
    venueName, // Use venueName directly
    venueArea, // Use venueArea directly
    endTime,
    coach,
    availableSpots,
  } = classInfo;

  const spotsDisplay =
    availableSpots === 1 ? "1 spot left" : `${availableSpots} spots left`;
  const waitlistDisplay = availableSpots === 0 ? "Wait list" : spotsDisplay;

  // Use the safeFormatDate utility to format dates
  const formattedStartTime = safeFormatDate(startTime, "h:mm a");
  const formattedEndTime = safeFormatDate(endTime, "h:mm a");

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Move className to the very top */}
      <Text style={styles.className}>{name}</Text>
      
      {/* Then, render the header with time and spots */}
      <View style={styles.header}>
        <Text style={styles.time}>{`${formattedStartTime} - ${formattedEndTime}`}</Text>
        <Text style={styles.spots}>{waitlistDisplay}</Text>
      </View>
      
      {/* Finally, show the details at the bottom */}
      <Text style={styles.details}>
        {venueName} | {venueArea || "Unknown Area"} | {coach || "Varying instructors"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // Increased spacing between the header and class name
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  spots: {
    fontSize: 14,
    color: "darkgreen",
    fontWeight: "bold",
  },
  className: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6, // Increased bottom margin for better visual separation
    color: "black",
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
});

export default ClassCard;
