import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { AppUserContext } from '../contexts/AppUserContext';
import { Currency } from '../types/types'; // Ensure this path is correct*

const WalletScreen = () => {
    const { user } = useContext(AppUserContext);

    const currencyOrder: Currency[] = ['TND', 'EURO', 'NOK', 'SWEETUN'];



    return (
        <ScrollView style={styles.container}>
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
      
      
      export default WalletScreen;
      