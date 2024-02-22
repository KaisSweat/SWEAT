// AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GymScreen from '../screens/GymScreen';
import GymDetailScreen from '../screens/GymDetailScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassesListForVenue from '../screens/ClassesListForVenue'; // Ensure this import is correct
import { RootStackParamList } from '../types/types';
import MyClassesScreen from '../screens/MyClassesScreen';

const Tab = createBottomTabNavigator();
const GymStack = createStackNavigator<RootStackParamList>();
const ClassesStack = createStackNavigator<RootStackParamList>();

const GymStackScreen = () => {
  return (
    <GymStack.Navigator>
      <GymStack.Screen name="GymList" component={GymScreen} options={{ headerShown: false }} />
      <GymStack.Screen name="GymDetail" component={GymDetailScreen} />
      <GymStack.Screen name="ClassesListForVenue" component={ClassesListForVenue} />
      <GymStack.Screen name="ClassDetail" component={ClassDetailScreen} />
    </GymStack.Navigator>
  );
};

const ClassesStackScreen = () => {
  return (
    <ClassesStack.Navigator>
      <ClassesStack.Screen name="ClassesList" component={ClassesScreen} options={{ headerShown: false }} />
      <ClassesStack.Screen name="ClassDetail" component={ClassDetailScreen} />
    </ClassesStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gym" component={GymStackScreen} />
      <Tab.Screen name="Classes" component={ClassesStackScreen} />
      <Tab.Screen name="MyClasses" component={MyClassesScreen} options={{ title: 'My Classes' }} />
      {/* Add other tabs as needed */}
    </Tab.Navigator>
  );
};

export default AppNavigator;
