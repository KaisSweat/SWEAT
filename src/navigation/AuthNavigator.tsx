// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignUpScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import PasswordRecoveryScreen from '../screens/auth/PasswordRecoveryScreen';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignupScreen} />
    <Stack.Screen name="PasswordReset" component={PasswordRecoveryScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
