import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { AppUserContext } from '../contexts/AppUserContext';
import auth from '@react-native-firebase/auth';
import { Currency } from '../types/types'; // Ensure this path is correct
import { uploadQRCodeUser } from '../services/QrcodeGenService'; // Adjust this import as needed

const HomeScreen = () => {
  const { user } = useContext(AppUserContext);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Define your currency order with explicit type
  const currencyOrder: Currency[] = ['TND', 'EURO', 'NOK', 'SWEETUN'];

  const handleGenerateQRCode = async () => {
    if (user) {
      const qrData = JSON.stringify({ userID: user.id, userName: user.firstName });
      try {
        console.log(`Uploading QR code for user ID: ${user.id}`);
        const newQrCodeUrl = await uploadQRCodeUser(user.id, qrData);
        setQrCodeUrl(newQrCodeUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
        Alert.alert("QR Code Generation Failed", "An error occurred while generating the QR code.");
      }
    } else {
      Alert.alert("Missing User Data", "User data is not available for QR code generation.");
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", "An error occurred while trying to log out.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.firstName}!</Text>
      <Text style={styles.text}>User ID: {user?.id}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your Balance:</Text>
        {user?.balance ? (
          currencyOrder.map(currency => user.balance[currency] !== undefined && (
            <Text key={currency} style={styles.balanceText}>
              {`${currency.toUpperCase()}: ${user.balance[currency]}`}
            </Text>
          ))
        ) : (
          <Text style={styles.balanceText}>Loading balance...</Text>
        )}
      </View>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  balanceText: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  actionButton: {
    // Styles for the QR code generation button
    alignSelf: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});


export default HomeScreen;
