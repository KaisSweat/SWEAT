// src/components/NavigationIcon.tsx
import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBuilding, faListAlt, faHeart, faQrcode } from '@fortawesome/free-solid-svg-icons';

interface NavigationIconProps {
  routeName: string;
  color: string;
  size: number;
  focused: boolean;
}

const NavigationIcon: React.FC<NavigationIconProps> = ({ routeName, color, size, focused }) => {
  let icon;
  let accessibilityLabel = '';

  switch (routeName) {
    case 'Home':
      icon = faHome;
      accessibilityLabel = 'Home Tab';
      break;
    case 'Gym':
      icon = faBuilding;
      accessibilityLabel = 'Gym Tab';
      break;
    case 'Classes':
      icon = faListAlt;
      accessibilityLabel = 'Classes Tab';
      break;
    case 'MyClasses':
      icon = faHeart;
      accessibilityLabel = 'My Classes Tab';
      break;
    case 'CheckIn':
      icon = faQrcode;
      accessibilityLabel = 'Check-In Tab';
      break;
    default:
      return null;
  }

  // Optionally adjust color or icon for active state
  const finalColor = focused ? '#007bff' : color;

  return (
    <View accessibilityLabel={accessibilityLabel} accessible>
      <FontAwesomeIcon icon={icon} size={size} color={finalColor} />
    </View>
  );
};

export default NavigationIcon;
