import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import backgroundImage from '../img/background.png';
import { getAuth, signInAnonymously } from 'firebase/auth';
import PropTypes from 'prop-types'; // Import PropTypes

const Start = ({ navigation }) => {
  // State to manage user's name and selected background color
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#090C08'); // Default background color
  const [selectedColor, setSelectedColor] = useState('#090C08'); // Default selected color

  Start.propTypes = {
    navigation: PropTypes.object.isRequired, // Validate that 'navigation' is an object and is required
  };

  // Function to set the background color
  const setChatBackgroundColor = (color) => {
    setBackgroundColor(color);
    setSelectedColor(color); // Update the selected color
  };

  const handleAnonymousLogin = async () => {
    const auth = getAuth(); // Initialize Firebase Authentication

    try {
      // Sign in the user anonymously
      await signInAnonymously(auth);
      // Show a success message using Alert
      Alert.alert('Signed in Successfully!');

      // Rest of code to navigate to the Chat screen
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Navigate to the Chat screen and pass route parameters
      navigation.navigate('Chat', {
        userId: user.uid, // User's id
        name: name, // User's name
        backgroundColor: backgroundColor, // Selected background color
      });
    } catch (error) {
      // Show an error message using Alert
      Alert.alert('Unable to sign in, try again later.');
      console.error('Error logging in anonymously:', error);
    }
  };

  // Determine text color based on the background color
  const textColor = backgroundColor === '#090C08' ? '#FFFFFF' : '#000000';

  return (
    // Use of image as the background
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title]}>Chat App</Text>
        <TextInput
          style={[styles.textInput, { color: '#FFFFFF' }]} // Set the text color to white
          value={name}
          onChangeText={setName}
          placeholder='Your Name'
          placeholderTextColor='#8e8e8e'
        />

        {/* Container for displaying color options */}
        <View style={styles.colorOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: '#090C08' },
              backgroundColor === '#090C08' && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor('#090C08')}
            activeOpacity={1} // Disable touch feedback
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: '#474056' },
              backgroundColor === '#474056' && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor('#474056')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: '#8A95A5' },
              backgroundColor === '#8A95A5' && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor('#8A95A5')}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={[
              styles.colorOption,
              { backgroundColor: '#B9C6AE' },
              backgroundColor === '#B9C6AE' && styles.selectedColorOption,
            ]}
            onPress={() => setChatBackgroundColor('#B9C6AE')}
            activeOpacity={1}
          />
        </View>

        {/* Add the label below the color options */}
        <Text style={styles.colorOptionsLabel}>Choose a Background Color</Text>

        {/* Button to start chatting */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleAnonymousLogin} // Use the handleAnonymousLogin function
          accessible={true}
          accessibilityLabel='Start Chatting'
          accessibilityHint='Logs in anonymously and navigates to the chat screen.'
          accessibilityRole='button'>
          <Text style={styles.startButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

// Styles for various components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: -80,
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: 'rgba(117, 112, 131, 0.5)',
    marginTop: 20,
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 120,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '300',
    borderColor: '#757083', // Border color
  },
  colorOptionsContainer: {
    flexDirection: 'row', // Display color options horizontally
    marginVertical: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  colorOptionsLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: -7, // Adjust the marginTop to raise or lower the label
    marginBottom: 5, // for spacing
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#FFFFFF', // White border color for the selected option
  },
  startButton: {
    backgroundColor: '#757083', // Background color of the Start Chatting button
    padding: 15,
    borderRadius: 8, // Adds rounded corners to the button
    marginTop: 15,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // White text color
    textAlign: 'center',
  },
});

export default Start;
