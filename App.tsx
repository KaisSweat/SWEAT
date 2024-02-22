import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './src/config/firebaseConfig'; // Adjust the path as necessary
import { AppDataProvider } from './src/contexts/AppDataContext';
import { AppUserProvider } from './src/contexts/AppUserContext';


// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase App initialized");
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppDataProvider> 
        <AppUserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </AppUserProvider>
      </AppDataProvider>
    </SafeAreaView>
//    </AppDataProvider> // Close the AppDataProvider
  );
};


export default App;