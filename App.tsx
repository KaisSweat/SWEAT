import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './src/config/firebaseConfig';
import { AppDataProvider } from './src/contexts/AppDataContext';
import { AppUserProvider } from './src/contexts/AppUserContext'; // Make sure this is correctly imported

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase App initialized");
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null as initial state for loading

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(user => {
      console.log("Auth state changed, user:", user); // Log the user object to see what Firebase returns
      setIsAuthenticated(!!user);
    });

    return subscriber; // Unsubscribe on cleanup
  }, []);

  // Log the current authentication state
  console.log('Is Authenticated:', isAuthenticated);

  if (isAuthenticated === null) {
    // Loading state before authentication state is determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? 'black' : 'white' }}>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 20 }}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <AppDataProvider>
      <AppUserProvider> 
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </SafeAreaView>
      </AppUserProvider>
    </AppDataProvider>
  );
};

export default App;
