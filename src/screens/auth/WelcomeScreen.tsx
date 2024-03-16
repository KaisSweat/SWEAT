import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/types';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
      {/* Logo image */}
      <Image
        source={require('../../assets/images/logo.png')} // Replace with the actual path to your logo
        style={styles.logo}
        resizeMode="contain" // Ensures the entire logo is visible
      />

      {/* Button to navigate to login screen */}
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      {/* Button to navigate to signup screen */}
      <TouchableOpacity style={styles.button} onPress={navigateToSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 200, // Set the width of your logo
    height: 200, // Set the height of your logo
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;