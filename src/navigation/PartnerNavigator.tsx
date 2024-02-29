import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerDashboard from '../screens/partner/PartnerDashboard';
import PartnerDetailsScreen from '../screens/partner/PartnerDetailsScreen';
import PartnerVenueEditScreen from '../screens/partner/PartnerVenueEditScreen';
import { RootStackParamList } from '../types/types'; // Adjust this import path as necessary

const Stack = createStackNavigator<RootStackParamList>();

function PartnerNavigator() {
  return (
    <Stack.Navigator initialRouteName="PartnerDashboard">
      <Stack.Screen
        name="PartnerDashboard"
        component={PartnerDashboard}
        options={{ headerTitle: 'Dashboard' }}
      />
      <Stack.Screen
        name="PartnerDetails"
        component={PartnerDetailsScreen}
        options={{ headerTitle: 'Venue Details' }}
      />
      <Stack.Screen
        name="PartnerVenueEdit"
        component={PartnerVenueEditScreen}
        options={{ headerTitle: 'Edit Venue' }}
      />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
}

export default PartnerNavigator;
