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

const PartnerClassesStackNavigator = () => (
  <PartnerClassesStack.Navigator initialRouteName="ClassesListForPartner">
    <PartnerClassesStack.Screen name="ClassesListForPartner" component={ClassesListForPartner} options={{ title: 'Your Classes' }} />
    <PartnerClassesStack.Screen name="ClassDetailsForPartner" component={ClassDetailsForPartner} options={{ title: 'Class Details' }} />
  </PartnerClassesStack.Navigator>
);

const PartnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case 'PartnerDashboard':
              icon = faHome;
              break;
            case 'PartnerDetails':
              icon = faBuilding;
              break;
            case 'PartnerClassAdd':
              icon = faCalendarPlus;
              break;
            case 'ClassesListForPartner':
              icon = faList;
              break;
            case 'PartnerVenueEdit': // Added setting icon for PartnerVenueEdit
              icon = faTools;
              break;
            default:
              icon = null;
          }
          return icon ? <FontAwesomeIcon icon={icon} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="PartnerDashboard" component={PartnerDashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="PartnerDetails" component={PartnerDetailsScreen} options={{ title: 'Venue' }} />
      <Tab.Screen name="PartnerClassAdd" component={PartnerClassAddScreen} options={{ title: 'Add Class' }} />
      {/* You might want to include the Venue Edit screen as a part of a stack instead of a direct tab option */}
      <Tab.Screen name="ClassesListForPartner" component={PartnerClassesStackNavigator} options={{ title: 'Classes' }} />
      {/* Including PartnerVenueEdit as an example, though it might be better placed within a stack for flow */}
      <Tab.Screen name="PartnerVenueEdit" component={PartnerVenueEditScreen} options={{ title: 'Edit Venue' }} />
    </Tab.Navigator>
  );
};

export default PartnerNavigator;
