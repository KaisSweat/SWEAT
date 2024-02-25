import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Log in</Text>

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
      
      <TouchableOpacity onPress={() => { /* navigate to Reset Password */ }}>
        <Text style={styles.forgotPassword}>Forgot password? Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.orContinueWith}>Or continue with:</Text>
      
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={() => { /* Handle Apple login */ }}>
          <FontAwesomeIcon icon={faApple} size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Handle Google login */ }}>
          <FontAwesomeIcon icon={faGoogle} size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Handle Facebook login */ }}>
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
  forgotPassword: {
    textAlign: 'right',
    color: 'blue',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'limegreen',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orContinueWith: {
    textAlign: 'center',
    marginBottom: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default LoginScreen;
