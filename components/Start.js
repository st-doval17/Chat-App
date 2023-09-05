import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import backgroundImage from "../img/background.png";

const Start = ({ navigation }) => {
  // State to manage user's name and selected background color
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#090C08"); // Default background color
  const [selectedColor, setSelectedColor] = useState("#090C08"); // Default selected color

  // Function to set the background color
  const setChatBackgroundColor = (color) => {
    setBackgroundColor(color);
    setSelectedColor(color); // Update the selected color
  };

  // Determine text color based on the background color
  const textColor = backgroundColor === "#090C08" ? "#FFFFFF" : "#000000";

  return (
    // Use of image as the background
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title]}>Chat App</Text>
        <TextInput
          style={[styles.textInput, { color: "#FFFFFF" }]} // Set the text color to white
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          placeholderTextColor="#8e8e8e"
        />

        {/* Container for displaying color options */}
        <View style={styles.colorOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: "#090C08" },
              backgroundColor === "#090C08" && styles.selectedColorOption, // Apply the selected style conditionally
            ]}
            onPress={() => setChatBackgroundColor("#090C08")}
            activeOpacity={1} // Disable touch feedback
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: "#474056" },
              backgroundColor === "#474056" && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor("#474056")}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: "#8A95A5" },
              backgroundColor === "#8A95A5" && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor("#8A95A5")}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: "#B9C6AE" },
              backgroundColor === "#B9C6AE" && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor("#B9C6AE")}
            activeOpacity={1}
          />
        </View>

        {/* Add the label below the color options */}
        <Text style={styles.colorOptionsLabel}>Choose a Background Color</Text>

        {/* Button to start chatting */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            navigation.navigate("Chat", {
              name: name,
              backgroundColor: backgroundColor,
            })
          }>
          <Text style={styles.startButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const colorOptions = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

// Styles for various components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ensure the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better readability
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: -80,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    color: "rgba(117, 112, 131, 0.5)",
    marginTop: 20,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 120,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "300",
    borderColor: "#757083", // Border color
  },
  colorOptionsContainer: {
    flexDirection: "row", // Display color options horizontally
    marginVertical: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  colorOptionsLabel: {
    fontSize: 14, // You can adjust the font size if needed
    color: "rgba(255, 255, 255, 0.5)", // Adjust the color as needed
    marginTop: -7, // Adjust the marginTop to raise or lower the label
    marginBottom: 5, // Optional, add marginBottom for spacing
  },
  selectedColorOption: {
    borderWidth: 2, // Add a border to the selected color option
    borderColor: "#FFFFFF", // White border color for the selected option
  },
  startButton: {
    backgroundColor: "#757083", // Background color of the Start Chatting button
    padding: 15,
    borderRadius: 8, // Adds rounded corners to the button
    marginTop: 15,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF", // White text color
    textAlign: "center",
  },
});

export default Start;
