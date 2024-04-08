import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Item } from "../types/types"; // Ensure this path is correct

type ItemCardProps = {
  itemInfo: Item;
  onPress: () => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ itemInfo, onPress }) => {
  const {
    name,
    description,
    priceInSweetun,
    image,
    stockQuantity,
  } = itemInfo;

  const stockDisplay = stockQuantity !== undefined ? `${stockQuantity} in stock` : "Stock unavailable";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.itemName}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.footer}>
        <Text style={styles.price}>{priceInSweetun} SWEETUN</Text>
        <Text style={styles.stock}>{stockDisplay}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 150, // Adjust according to your needs
    height: 150, // Adjust according to your needs
    borderRadius: 8, // Optional: if you want rounded corners for the image
    marginBottom: 8, // Space between the image and the text below it
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: 'center', // Ensure the name is centered if it's long
    marginBottom: 4, // Space between the item name and description or price
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: 'center', // Center align the description text
    marginBottom: 8, // Space between the description and the footer
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, 
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "darkgreen",
  },
  stock: {
    fontSize: 14,
    color: "#666",
  },
});

export default ItemCard;
