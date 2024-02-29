// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import PartnerNavigator from './src/navigation/PartnerNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AppDataProvider } from './src/contexts/AppDataContext';
import { AppUserProvider } from './src/contexts/AppUserContext';
import useAuth from './src/hooks/useAuth';

const App: React.FC = () => {
  const { isLoading, isAuthenticated, userRole, error } = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? 'black' : 'white' }}>
        <ActivityIndicator size="large" color={isDarkMode ? 'white' : 'black'} />
        <Text style={{ color: isDarkMode ? 'white' : 'black', marginTop: 20 }}>Checking authentication...</Text>
      </View>
    );
  }

  const renderNavigator = () => {
    if (!isAuthenticated) {
      return <AuthNavigator />;
    }
    return userRole === 'partner' ? <PartnerNavigator /> : <AppNavigator />;
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
