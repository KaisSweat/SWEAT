import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Venue } from "../types/types";
import { fetchVenueById } from "../services/VenueService";
import { decodePlusCode } from "../utils/decodePlusCode"; // Use your decodePlusCode function


type GymDetailScreenRouteProp = RouteProp<RootStackParamList, "GymDetail">;
type GymDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GymDetail"
>;

interface Props {
  route: GymDetailScreenRouteProp;
  navigation: GymDetailScreenNavigationProp;
}

const GymDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { venueId } = route.params;

  useEffect(() => {
    const loadVenueAndCoordinates = async () => {
      try {
        setLoading(true);
        const fetchedVenue = await fetchVenueById(venueId);
        if (fetchedVenue) {
          setVenue(fetchedVenue);
          // Check if PlusCode exists, if not, use a fallback or set coordinates to null
          if (fetchedVenue.PlusCode) {
            const coords = await decodePlusCode(fetchedVenue.PlusCode);
            if (coords) {
              setCoordinates(coords);
            } else {
              console.error("Failed to fetch coordinates for venue Plus Code.");
              // Optionally, set coordinates to a default or null
              setCoordinates(null);
            }
          } else {
            console.log(
              "PlusCode not available for venue, skipping coordinate decoding."
            );
            // Optionally, set coordinates to a default or null
            setCoordinates(null);
          }
        } else {
          console.error("Venue details not available.");
          setVenue(null);
        }
      } catch (error) {
        console.error(
          "Error fetching venue details or decoding Plus Code:",
          error
        );
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };

    loadVenueAndCoordinates();
  }, [venueId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!venue) {
    return <Text>Venue details not available.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: venue.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type.join(", ")}</Text>
        <Text style={styles.rating}>Rating: {venue.rating}</Text>
        <Text style={styles.distance}>Distance: {venue.distance} meters</Text>
        <Text style={styles.description}>{venue.description}</Text>
        <TouchableOpacity
          style={styles.showClassesButton}
          onPress={() =>
            navigation.navigate("ClassesListForVenue", { venueId: venue.id })
          }
        >
          <Text style={styles.showClassesText}>Show Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showMenuButton}
          onPress={() =>
            navigation.navigate("ItemsListForVenue", { venueId: venue.id })
          }
        >
          <Text style={styles.showMenuText}>Show Menu</Text>
        </TouchableOpacity>
      </View>
      {coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...coordinates,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={coordinates} title={venue.name} />
        </MapView>
      )}
      <Text style={styles.venueAddress}>{venue.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  details: {
    padding: 20,
    alignItems: "flex-start",
    width: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  type: {
    fontSize: 18,
    color: "gray",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
    alignSelf:"stretch",
  },
  distance: {
    fontSize: 16,
    marginBottom: 16,
    color: "gray",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
  venueAddress: {
    fontSize: 14,
    color: "gray",
    marginBottom: 6,
  },
  map: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  showClassesButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  showMenuButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  showClassesText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  showMenuText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GymDetailScreen;
