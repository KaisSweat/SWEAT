import storage from '@react-native-firebase/storage';
import { Asset } from 'react-native-image-picker';
import { updateVenueImage } from './firestoreService';

export const uploadImage = async (image: Asset): Promise<string> => {
  if (!image.uri) {
    throw new Error('Image upload failed: No image path available.');
  }

  // Extract image name and prepare the path
  const imageName = image.fileName || `image_${new Date().getTime()}`;
  const imagePath = `venue_images/${imageName}`;

  // Upload image
  const response = await fetch(image.uri);
  const blob = await response.blob();
  const storageRef = storage().ref(imagePath);
  await storageRef.put(blob);

  // Get and return image URL
  const url = await storageRef.getDownloadURL();
  console.log("Uploaded Image URL: ", url);
  return url;
};




export const handleImageUploadAndUpdate = async (image: Asset, venueId: string): Promise<void> => {
  try {
    // Upload the image and get the URL
    const imageUrl = await uploadImage(image);
    
    // Update the Firestore document with the new image URL
    await updateVenueImage(venueId, imageUrl);

    console.log('Image uploaded and venue updated successfully:', imageUrl);
    // Here you can return or trigger any success handling, such as navigating back or showing a success message
  } catch (error) {
    console.error('Error during image upload and update:', error);
    // Here you can handle or display any errors, such as showing an error message to the user
    throw error; // Optional: rethrow the error if you want to handle it further up the call stack
  }
};