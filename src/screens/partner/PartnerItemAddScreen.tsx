import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, ItemData } from '../../types/types';
import { AppUserContext } from '../../contexts/AppUserContext';
import { addItemToVenue } from '../../services/VenueService';

type PartnerItemAddScreenProps = StackScreenProps<RootStackParamList, 'PartnerItemAdd'>;

const PartnerItemAddScreen: React.FC<PartnerItemAddScreenProps> = ({ navigation }) => {
  const { user } = useContext(AppUserContext);
  const [itemDetails, setItemDetails] = useState({
    name: '',
    description: '',
    priceInSweetun: 0,
    stockQuantity: 0,
    image: '',
    categories: [],
  });
  

  const updateItemDetails = (field: keyof ItemData, value: string | number) => {
    setItemDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, description, priceInSweetun, stockQuantity, image, categories } = itemDetails;
  
    if (!name || priceInSweetun <= 0 || stockQuantity < 0 || !user?.venueId) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    const newItem = {
      name,
      description,
      priceInSweetun,
      stockQuantity,
      image,
      categories,
      venueId: user.venueId, // Append the venueId here
    };
  
    try {
      await addItemToVenue(user.venueId, newItem);
      Alert.alert('Success', 'Item added successfully!');
      navigation.goBack(); // Or navigate to the appropriate screen
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add the item. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Item Name" 
        value={itemDetails.name} 
        onChangeText={(text) => updateItemDetails('name', text)} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Description" 
        value={itemDetails.description} 
        onChangeText={(text) => updateItemDetails('description', text)} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Price" 
        value={itemDetails.priceInSweetun.toString()} 
        onChangeText={(text) => updateItemDetails('priceInSweetun', parseFloat(text))}
        keyboardType="numeric"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Stock Quantity" 
        value={itemDetails.stockQuantity.toString()} 
        onChangeText={(text) => updateItemDetails('stockQuantity', parseInt(text, 10))} 
        keyboardType="numeric"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Image URL" 
        value={itemDetails.image} 
        onChangeText={(text) => updateItemDetails('image', text)} 
      />
      {/* Add additional fields as necessary */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PartnerItemAddScreen;
