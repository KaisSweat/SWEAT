import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image ,ScrollView,TouchableOpacity} from 'react-native';
import { AppUserContext } from '../../contexts/AppUserContext';
import auth from '@react-native-firebase/auth';
import { fetchVenueById } from '../../services/firestoreService';
import { Venue } from '../../types/types';
import { uploadQRCode } from '../../services/QrcodeGenService';

const PartnerDashboard = () => {
  const { user, setUser } = useContext(AppUserContext);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const fetchAndCheckVenue = async () => {
      if (user?.venueId) {
        const fetchedVenue = await fetchVenueById(user.venueId);
        setVenue(fetchedVenue);
        if (!fetchedVenue.qrCodeUrl) {
          // QR code URL doesn't exist; Placeholder for QR code generation function
        } else {
          // QR code URL exists; Set it for display
          setQrCodeUrl(fetchedVenue.qrCodeUrl);
        }
      }
    };
    fetchAndCheckVenue();
  }, [user?.venueId]);

  const handleGenerateQRCode = async () => {
    if (venue) {
      const qrData = JSON.stringify({ venueId: venue.id, venueName: venue.name, PlusCode: venue.PlusCode });
      const newQrCodeUrl = await uploadQRCode(venue.id, qrData);
      setQrCodeUrl(newQrCodeUrl);
      // Assuming the venue state is updated with the new QR code URL in uploadQRCode function
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", "An error occurred while trying to log out.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Partner Dashboard</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>Role: {user?.role}</Text>
      <Text style={styles.text}>Venue ID: {venue?.id}</Text>
      <Text style={styles.text}>Venue Name: {venue?.name}</Text>
      {qrCodeUrl ? (
        <Image source={{ uri: qrCodeUrl }} style={styles.qrCode} />
      ) : (
        <TouchableOpacity style={styles.actionButton} onPress={handleGenerateQRCode}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Added a background color for the entire view
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centered title text
    color:'grey'
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333', // Darker text color for better readability
    textAlign: 'center', // Centered title text
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  actionButton: {
    alignSelf: 'stretch', // Stretch to the container's width with padding accounted
    backgroundColor: '#007bff', // Blue background for actionable buttons
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    alignSelf: 'center', // Center the button horizontally
    padding: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
    color:'black'
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerDashboard;