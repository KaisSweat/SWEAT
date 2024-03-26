import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';

interface WelcomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/logo1.png')} // Replace with the actual path to your logo
      style={styles.backgroundImage}
    >
      {/* Adjust the overlay opacity here if needed */}
      <View style={styles.overlay} />
      
      <View style={styles.buttonContainer}>
        {/* Button to navigate to login screen */}
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        {/* Button to navigate to signup screen */}
        <TouchableOpacity style={styles.button} onPress={navigateToSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end', // Align button container to the bottom
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)', // You can adjust the opacity here
  },
  buttonContainer: {
    marginBottom: 100, // Add desired margin to push the buttons down
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent buttons
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
