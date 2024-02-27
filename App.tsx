import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import PartnerNavigator from './src/navigation/PartnerNavigator'; // Ensure correct import
import AuthNavigator from './src/navigation/AuthNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './src/config/firebaseConfig';
import { AppDataProvider } from './src/contexts/AppDataContext';
import { AppUserProvider } from './src/contexts/AppUserContext';
import { getUserRole } from './src/services/firestoreUserService'; // Correctly import getUserRole

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // Fetch the user's role from Firestore
        const role = await getUserRole(user.uid);
        console.log(`User role: ${role}`); // Log the user role
        setUserRole(role); // Set the user role based on the authenticated user
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserRole(null); // Reset role on logout
      }
    });

    return () => subscriber(); // Unsubscribe on cleanup
  }, []);

  if (isAuthenticated === null) {
    // Loading state before authentication state is determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? 'black' : 'white' }}>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 20 }}>Checking authentication...</Text>
      </View>
    );
  }

  // Determine which navigator to render based on the user's role
  const renderNavigator = () => {
    if (isAuthenticated) {
      switch (userRole) {
        case 'member':
          return <AppNavigator />;
        case 'partner':
          return <PartnerNavigator />;
        default:
          // Handle unexpected roles or wait for role determination
          return <ActivityIndicator size="large" />;
      }
    } else {
      return <AuthNavigator />;
    }
  };

  return (
    <AppDataProvider>
      <AppUserProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            {renderNavigator()}
          </NavigationContainer>
        </SafeAreaView>
      </AppUserProvider>
    </AppDataProvider>
  );
};

export default App;
