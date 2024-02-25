import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBuilding, faListAlt, faHeart, faCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/HomeScreen';
import GymScreen from '../screens/GymScreen';
import GymDetailScreen from '../screens/GymDetailScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassesListForVenue from '../screens/ClassesListForVenue';
import MyClassesScreen from '../screens/MyClassesScreen';
import { RootStackParamList } from '../types/types';
import CheckInScreen from '../screens/CheckInScreen';

const Tab = createBottomTabNavigator();
const GymStack = createStackNavigator<RootStackParamList>();
const ClassesStack = createStackNavigator<RootStackParamList>();

const GymStackScreen = () => (
  <GymStack.Navigator>
    <GymStack.Screen name="GymList" component={GymScreen} options={{ headerShown: true, title: 'Gyms' }} />
    <GymStack.Screen name="GymDetail" component={GymDetailScreen} />
    <GymStack.Screen name="ClassesListForVenue" component={ClassesListForVenue} />
    <GymStack.Screen name="ClassDetail" component={ClassDetailScreen} />
  </GymStack.Navigator>
);

const ClassesStackScreen = () => (
  <ClassesStack.Navigator>
    <ClassesStack.Screen name="ClassesList" component={ClassesScreen} options={{ headerShown: true, title: 'Classes' }} />
    <ClassesStack.Screen name="ClassDetail" component={ClassDetailScreen} />
  </ClassesStack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = faHome;
              break;
            case 'Gym':
              icon = faBuilding;
              break;
            case 'Classes':
              icon = faListAlt;
              break;
            case 'MyClasses':
              icon = faHeart;
              break;
            case 'CheckIn': // New Check-In case
              icon = faQrcode; // Using faQrcode as the icon
              break;
            default:
              icon = faCircle;
              break;
          }
          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gym" component={GymStackScreen} />
      <Tab.Screen name="Classes" component={ClassesStackScreen} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-In' }} /> 
      <Tab.Screen name="MyClasses" component={MyClassesScreen} options={{ title: 'My Classes' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
