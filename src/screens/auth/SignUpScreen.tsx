import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { AppUserContext } from '../../contexts/AppUserContext';
import AuthenticationService from '../../services/AuthenticationService';
import { RootStackParamList } from '../../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppUser } from '../../types/types';


type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; // Assuming you want to navigate to 'Home' after signup

const SignupScreen = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { setUser } = useContext(AppUserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignup = async () => {
    const result = await AuthenticationService.signupUser(email, password, firstName, lastName);
    if (result.success && result.user) {
        // Construct an AppUser object that matches the expected structure
        const appUser: AppUser = {
            id: result.user.id,
            name: `${result.user.firstName} ${result.user.lastName}`, // Combine firstName and lastName
            email: result.user.email,
            bookings: [], // Provide a default empty array for bookings
            // Include any other properties expected by AppUser type
        };

        setUser(appUser); // Update user context with the new user's information
        navigation.navigate('Home'); // Navigate to the Home screen upon successful signup
    } else {
        Alert.alert('Signup Failed', result.message || 'Please try again.');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />

        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.visibilityToggle}
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} size={20} color="grey" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Create Account</Text>
      </TouchableOpacity>


      <View style={styles.socialSignupContainer}>
            <TouchableOpacity onPress={() => { /* Implement Apple login logic */ }}>
                <FontAwesomeIcon icon={faApple} size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Implement Google login logic */ }}>
                <FontAwesomeIcon icon={faGoogle} size={30} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Implement Facebook login logic */ }}>
                <FontAwesomeIcon icon={faFacebookF} size={30} color="#3B5998" />
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7', // A softer shade of white
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600', // Less bold than 'bold' but still strong
    textAlign: 'center',
    marginVertical: 32, // More vertical space around the title
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc', // A softer grey
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 16, // Consistent spacing between inputs
    backgroundColor: '#ffffff', // White background for inputs
    borderRadius: 5, // Slight rounding of corners
    elevation: 1, // Subtle shadow for an inset effect
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16, // Match spacing with other inputs
  },
  visibilityToggle: {
    position: 'absolute',
    right: 15,
    padding: 12,
  },
  signupButton: {
    backgroundColor: '#4CAF50', // A more vibrant green
    paddingVertical: 15,
    borderRadius: 8, // More pronounced rounding of corners
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32, // More space above the button
    shadowColor: '#2E7D32', // A shadow that matches the button color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  socialSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 32, // Added space above social icons
    marginBottom: 32, // Added space below social icons
  },
  socialIcon: {
    width: 40, // Larger touch targets for social icons
    height: 40,
    marginHorizontal: 12, // Space out the icons horizontally
  },
});


export default SignupScreen;
