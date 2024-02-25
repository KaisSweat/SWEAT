import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const SignupScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);

  const handleSignup = () => {
    // Implement your sign-up logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Create account</Text>

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
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
          style={styles.visibilityToggle}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} size={20} color="grey" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.termsContainer} onPress={() => setIsAgreeToTerms(!isAgreeToTerms)}>
        <FontAwesomeIcon icon={isAgreeToTerms ? faCheckSquare : faSquare} size={24} color={isAgreeToTerms ? 'green' : 'grey'} />
        <Text style={styles.termsText}>I agree to the Bruce Terms of Service and Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Create account</Text>
      </TouchableOpacity>

      <Text style={styles.orSignUpWith}>Or sign up with:</Text>

      <View style={styles.socialSignupContainer}>
        <TouchableOpacity onPress={() => { /* Handle Apple sign-up */ }}>
          <FontAwesomeIcon icon={faApple} size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Handle Google sign-up */ }}>
          <FontAwesomeIcon icon={faGoogle} size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Handle Facebook sign-up */ }}>
          <FontAwesomeIcon icon={faFacebookF} size={30} color="#3B5998" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilityToggle: {
    padding: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: 'limegreen',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orSignUpWith: {
    textAlign: 'center',
    marginBottom: 10,
  },
  socialSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default SignupScreen;
