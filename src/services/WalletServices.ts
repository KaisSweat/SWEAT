import firestore from '@react-native-firebase/firestore';
import { AppUser, Currency, Balance } from '../types/types'; // Adjust this path as needed

class WalletService {
  private usersRef = firestore().collection('users');

  constructor() {
    // Enhancements for initialization can be added here
  }

  // Utilize this method to validate currency codes
  private validateCurrency(currency: Currency): boolean {
    const validCurrencies: Currency[] = ['NOK', 'EURO',  'TND', 'SWEETUN'];
    return validCurrencies.includes(currency);
  }

  // Enhanced fetchUserBalance with input validation
  async fetchUserBalance(userId: string): Promise<Balance> {
    if (!userId) throw new Error("Invalid user ID.");
    try {
      const userDoc = await this.usersRef.doc(userId).get();
      if (!userDoc.exists) {
        throw new Error("User not found.");
      }
      const userData = userDoc.data() as AppUser;
      return userData.balance || {};
    } catch (error) {
      console.error("Error fetching user balance:", error);
      throw error; // Rethrow the error after logging
    }
  }

  // Add credit to a user's wallet with currency validation
  async addCredit(userId: string, currency: Currency, amount: number): Promise<void> {
    if (!this.validateCurrency(currency)) throw new Error("Unsupported currency.");
    if (amount <= 0) throw new Error("Amount must be greater than zero.");

    try {
      await firestore().runTransaction(async (transaction) => {
        const userDocRef = this.usersRef.doc(userId);
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists) throw new Error("User document does not exist.");

        const userData = userDoc.data() as AppUser;
        const newBalance = (userData.balance[currency] || 0) + amount;
        transaction.update(userDocRef, { [`balance.${currency}`]: newBalance });
      });
    } catch (error) {
      console.error("Error adding credit:", error);
      throw error;
    }
  }

  // Subtract credit from a user's wallet with currency validation
  async subtractCredit(userId: string, currency: Currency, amount: number): Promise<void> {
    if (!this.validateCurrency(currency)) throw new Error("Unsupported currency.");
    if (amount <= 0) throw new Error("Amount must be greater than zero.");

    try {
      await firestore().runTransaction(async (transaction) => {
        const userDocRef = this.usersRef.doc(userId);
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists) throw new Error("User document does not exist.");

        const userData = userDoc.data() as AppUser;
        const currentBalance = userData.balance[currency] || 0;
        if (currentBalance < amount) throw new Error("Insufficient funds.");

        transaction.update(userDocRef, { [`balance.${currency}`]: currentBalance - amount });
      });
    } catch (error) {
      console.error("Error subtracting credit:", error);
      throw error;
    }
  }

  // Send credit from one user to another with currency validation
  async sendCredit(fromUserId: string, toUserId: string, currency: Currency, amount: number): Promise<void> {
    if (!this.validateCurrency(currency)) throw new Error("Unsupported currency.");
    if (amount <= 0) throw new Error("Amount must be greater than zero.");

    try {
      await firestore().runTransaction(async (transaction) => {
        const fromUserDocRef = this.usersRef.doc(fromUserId);
        const toUserDocRef = this.usersRef.doc(toUserId);

        const fromUserDoc = await transaction.get(fromUserDocRef);
        const toUserDoc = await transaction.get(toUserDocRef);

        if (!fromUserDoc.exists || !toUserDoc.exists) throw new Error("One or both users do not exist.");

        const fromUserData = fromUserDoc.data() as AppUser;
        const toUserData = toUserDoc.data() as AppUser;

        const fromUserCurrentBalance = fromUserData.balance[currency] || 0;
        if (fromUserCurrentBalance < amount) throw new Error("Insufficient funds from sender.");

        const toUserCurrentBalance = toUserData.balance[currency] || 0;

        transaction.update(fromUserDocRef, { [`balance.${currency}`]: fromUserCurrentBalance - amount });
        transaction.update(toUserDocRef, { [`balance.${currency}`]: toUserCurrentBalance + amount });
      });
    } catch (error) {
      console.error("Error sending credit:", error);
      throw error;
    }
  }
}

export default new WalletService();
