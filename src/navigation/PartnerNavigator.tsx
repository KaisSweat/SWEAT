import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PartnerDashboard from '../screens/partner/PartnerDashboard';
import PartnerDetailsScreen from '../screens/partner/PartnerDetailsScreen';
import PartnerVenueEditScreen from '../screens/partner/PartnerVenueEditScreen';
import PartnerClassAddScreen from '../screens/partner/PartnerClassAddScreen';
import ClassesListForPartner from '../screens/partner/ClassesListForPartner';
import ClassDetailsForPartner from '../screens/partner/ClassDetailsForPartner';
import { RootStackParamList } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBuilding, faCalendarPlus, faTools, faList } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator<RootStackParamList>();
const PartnerClassesStack = createStackNavigator();


// Define the main tab navigator, incorporating the classes stack navigator
const PartnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            // Define icons for each tab
            case 'PartnerDashboard':
              icon = faHome; break;
            case 'PartnerDetails':
              icon = faBuilding; break;
            case 'PartnerClassAdd':
              icon = faCalendarPlus; break;
            case 'ClassesListForPartner':
              icon = faList; break;
            case 'PartnerVenueEdit':
              icon = faTools; break;
            default:
              icon = null;
          }
          return icon ? <FontAwesomeIcon icon={icon} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* Define screens for each tab, using the stack navigator for the classes tab */}
      <Tab.Screen name="PartnerDashboard" component={PartnerDashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="PartnerDetails" component={PartnerDetailsScreen} options={{ title: 'Venue' }} />
      <Tab.Screen name="PartnerClassAdd" component={PartnerClassAddScreen} options={{ title: 'Add Class' }} />
      <Tab.Screen name="ClassesListForPartner" component={ClassesListForPartner} options={{ title: 'Classes' }} />
      <Tab.Screen name="PartnerVenueEdit" component={PartnerVenueEditScreen} options={{ title: 'Edit Venue' }} />
    </Tab.Navigator>
  );
};

export default PartnerNavigator;
