// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faBuilding, faListAlt, faHeart, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/HomeScreen';
import GymScreen from '../screens/GymScreen';
import GymDetailScreen from '../screens/GymDetailScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import ClassesListForVenue from '../screens/ClassesListForVenue';
import MyClassesScreen from '../screens/MyClassesScreen';
import CheckInScreen from '../screens/CheckInScreen';
import { RootStackParamList } from '../types/types';
import WalletScreen from '../screens/WalletScreen';
import PaymentSelectionScreen from '../screens/payement/PaymentSelectionScreen';
import PaymentMethodSelectionScreen from '../screens/payement/PaymentMethodSelectionScreen';
import MemberWalletScreen from '../screens/MemberWalletScreen';
import ItemsListForVenue from '../screens/ItemsListForVenue';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Tab = createBottomTabNavigator();
const GymStack = createStackNavigator<RootStackParamList>();
const ClassesStack = createStackNavigator<RootStackParamList>();
const WalletStack = createStackNavigator<RootStackParamList>(); // Create a stack for wallet-related screens

const GymStackScreen = () => (
  <GymStack.Navigator>
    <GymStack.Screen name="GymList" component={GymScreen} options={{ headerShown: true, title: 'Gyms' }} />
    <GymStack.Screen name="GymDetail" component={GymDetailScreen} />
    <GymStack.Screen name="ClassesListForVenue" component={ClassesListForVenue} />
    <GymStack.Screen name="ItemsListForVenue" component={ItemsListForVenue} />
    <GymStack.Screen name="ClassDetail" component={ClassDetailScreen} />
  </GymStack.Navigator>
);

const ClassesStackScreen = () => (
  <ClassesStack.Navigator>
    <ClassesStack.Screen name="ClassesList" component={ClassesScreen} options={{ headerShown: true, title: 'Classes' }} />
    <ClassesStack.Screen name="ClassDetail" component={ClassDetailScreen} />
  </ClassesStack.Navigator>
);
const WalletStackScreen = () => (
  <WalletStack.Navigator>
     <WalletStack.Screen name="MemberWallet" component={MemberWalletScreen} options={{ headerShown: true, title: 'My Wallet' }} />
    <WalletStack.Screen name="PaymentMethodSelection" component={PaymentMethodSelectionScreen} options={{ headerShown: true, title: 'Select Payment Method' }} />
  </WalletStack.Navigator>
);


const OwnerNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        switch (route.name) {
          case 'Home': icon = faWallet; break;
          case 'Wallet':icon= faWallet; break;
          case 'Venue': icon = faBuilding; break;
          case 'Booking': icon = faListAlt; break;
          case 'MyClasses': icon = faHeart; break;
          case 'CheckIn': icon = faQrcode; break;
          default: icon = null; break;
        }
        return icon ? <FontAwesomeIcon icon={icon} size={size} color={color} /> : null;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Wallet" component={WalletStackScreen} />
    <Tab.Screen name="Venue" component={GymStackScreen} />
    <Tab.Screen name="Booking" component={ClassesStackScreen} />
    <Tab.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-In' }} />
    <Tab.Screen name="MyClasses" component={MyClassesScreen} options={{ title: 'My Classes' }} />
  </Tab.Navigator>
);

export default OwnerNavigator;
