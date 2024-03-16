import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.text}>Partner Dashboard</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Venue ID: {venue?.id}</Text>
      <Text>Venue Name: {venue?.name}</Text>
      {qrCodeUrl ? (
        <Image source={{ uri: qrCodeUrl }} style={{ width: 200, height: 200 }} />
      ) : (
        <Button title="Generate QR Code" onPress={handleGenerateQRCode} />
      )}
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default PartnerDashboard;
