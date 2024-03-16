// AuthenticationService.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppUser } from '../types/types';

// Extend the standard Error interface to include the 'code' property for Firebase errors
interface FirebaseError extends Error {
  code: string;
}


const signupUser = async (email: string, password: string, firstName: string, lastName: string) => {
  // Check for empty input fields first
  if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;

    if (!firebaseUser || !firebaseUser.email) {
      throw new Error('User account creation failed');
    }

    // Prepare the user object for Firestore with an additional "role" field
    const newUser = {
      firstName,
      lastName,
      email: firebaseUser.email, // Use the verified email from Firebase Auth
      role: 'member', // Assign the "member" role to every new user
    };

    // Save the user's data, including the role, in Firestore
    await firestore().collection('users').doc(firebaseUser.uid).set(newUser);

    console.log('User account created and saved in Firestore with member role.');

    // Optionally, return success status and user object including the assigned role
    return { success: true, user: { id: firebaseUser.uid, ...newUser } };

  } catch (error) {
    let errorMessage = 'Signup failed. Please try again later.';
    if (error instanceof Error && 'code' in error) {
      // Handle Firebase Auth specific errors
      const firebaseError = error as FirebaseError; // Casting error to FirebaseError for type compatibility
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password is too weak. It should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid.';
          break;
        default:
          console.error('Signup error:', firebaseError.message);
      }
    } else {
      console.error('Non-Firebase signup error:', error);
    }
    return { success: false, message: errorMessage };
  }
};





const signInWithEmailAndPassword = async (email: string, password: string): Promise<AppUser | null> => {
  // Check if email or password fields are empty
  if (!email.trim() || !password.trim()) {
    // You can customize this message
    throw new Error('Email and password fields cannot be empty.');
  }

  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;
    if (!firebaseUser) {
      console.error('No Firebase user returned');
      return null;
    }

    const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
    if (!userDoc.exists) {
      console.error('User not found in Firestore');
      return null;
    }

    const userData = userDoc.data() as AppUser;
    const appUser: AppUser = {
      ...userData,
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
    };

    return appUser;

  } catch (error) {
    let errorMessage = 'Something went wrong. Please try again later.';
    if ((error as FirebaseError).code) {
      const firebaseError = error as FirebaseError;
  
      switch (firebaseError.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address format is incorrect. Please check and try again.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Your account has been disabled. Please contact support for more details.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          // Updated error message for wrong password
          errorMessage = 'The email or password you entered is incorrect. Please double-check your credentials.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many login attempts. Please wait a moment and try again.';
          break;
        default:
          errorMessage = 'Wrong Email or Password. Please try again.';
      }
    } else {
    }
    throw new Error(errorMessage);
  }
};

const signOut = async (): Promise<void> => {
  try {
    await auth().signOut();
  } catch (error) {
    let errorMessage = 'Sign-out failed. Please try again later.';
    if ((error as FirebaseError).code) {
      console.error('Error signing out:', (error as FirebaseError).code);
      // Handle specific sign-out errors if necessary
    } else {
      console.error('Non-Firebase error during sign-out:', error);
    }
    throw new Error(errorMessage);
  }
};

export default {
  signInWithEmailAndPassword,
  signOut,signupUser
};
