import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PartnerDashboard from '../screens/partner/PartnerDashboard'; // Update with your actual screen
import PartnerDetails from '../screens/partner/PartnerDetails'; // Update with your actual screen
// Import other screens as needed

const Stack = createStackNavigator();

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
        component={PartnerDetails}
        options={{ headerTitle: 'Details' }}
      />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
}

export default PartnerNavigator;
