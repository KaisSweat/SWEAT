import RNQRGenerator from 'rn-qr-generator';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const uploadQRCode = async (venueId: string, qrData: string): Promise<string> => {
  const { uri } = await RNQRGenerator.generate({
    value: qrData,
    height: 100,
    width: 100,
    correctionLevel: 'M', // Add this line
  });

  const imageName = `QR_${venueId}_${new Date().getTime()}.png`;
  const imagePath = `venue_qr_codes/${imageName}`;

  // Fetch the image as blob
  const response = await fetch(uri);
  const blob = await response.blob();

  // Upload blob to Firebase Storage
  const storageRef = storage().ref(imagePath);
  await storageRef.put(blob);

  // Get and return the QR code image URL
  const url = await storageRef.getDownloadURL();

  // Update Firestore with the QR code URL
  await firestore().collection('venues').doc(venueId).update({ qrCodeUrl: url });

  return url; // Return the download URL for further use if necessary
};