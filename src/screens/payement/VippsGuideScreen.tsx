// src/screens/payement/VippsGuideScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { uploadImage } from '../../services/imageUploadService'; // Import the uploadImage function

const VippsGuideScreen: React.FC = () => {
  const route = useRoute();
  const nokAmount = route.params ? route.params.nokAmount : '0'; // Retrieve the passed nokAmount parameter
  console.log('goparams:', nokAmount);

  const handlePaymentValidation = async (imageUri: string) => {
    try {
      const uploadedImageUrl = await uploadImage({ uri: imageUri, type: 'image/jpeg', name: 'payment_screenshot.jpg' }); // Assuming JPEG type
      // Perform OCR and validate payment based on uploadedImageUrl and nokAmount
      // Here, you should implement the validation logic or call an existing service
      console.log('Image uploaded, URL:', uploadedImageUrl);
      // Proceed with additional validation and navigate based on success or failure
    } catch (error) {
      console.error('Image upload or validation failed:', error);
      // Show an error message to the user
    }
  };

  const selectImage = () => {
    const options = { /* ... options ... */ };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        handlePaymentValidation(imageUri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIPPS Payment Guide</Text>
      <Text style={styles.instructions}>
        - Scan the QR code or open the VIPPS app{'\n'}
        - Pay the amount of {nokAmount}NOK to +47 91 00 90 94{'\n'}
        - Include the note "Birthday Gift"{'\n'}
        - Take a screenshot of the successful payment{'\n'}
        - Upload the screenshot here for validation
      </Text>
      <TouchableOpacity onPress={selectImage} style={styles.button}>
        <Text style={styles.buttonText}>Load your payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  instructions: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});

export default VippsGuideScreen;
