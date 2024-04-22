import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VippsGuideScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleUploadScreenshot = () => {
    // Function to handle screenshot upload and navigate to validation
    console.log('Upload and validate screenshot');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Follow these steps to complete your payment via VIPPS:
      </Text>
      <Text style={{ fontSize: 14 }}>
        1. Scan the QR code at the location or open the VIPPS app.
        2. Pay the specified NOK amount to the number provided.
        3. Take a screenshot of the successful payment.
      </Text>
      <Image source={require('../../assets/sweat1.jpg')} style={{ marginVertical: 20, width: 200, height: 200 }} />
      <TouchableOpacity onPress={handleUploadScreenshot} style={{ backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white' }}>Upload Payment Screenshot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VippsGuideScreen;
