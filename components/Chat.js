import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // Extracting 'name' and 'backgroundColor' from route parameters
  const { name, backgroundColor } = route.params;

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    // Update the 'messages' state with new messages
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Messages state initialization using useState()
  const [messages, setMessages] = useState([]);

  // Define the renderBubble function to customize bubble styles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // Customize the right-side bubble background color
          },
          left: {
            backgroundColor: "#FFF", // Customize the left-side bubble background color
          },
        }}
      />
    );
  };

  // Use useEffect to set the navigation options and preload messages
  useEffect(() => {
    navigation.setOptions({ title: name });

    // Create a message to announce your entry
    const entryMessage = {
      _id: 3, // Use a unique ID for the message
      text: `${name} has entered the chat`, // The entry message text
      createdAt: new Date(),
      system: true, // Mark it as a system message
    };

    // Initialize 'messages' state with user and entry messages when the component mounts
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      entryMessage, // Add the entry message to the state
    ]);
  }, [name]);

  // Render the chat screen with dynamic background and text color
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages} // Messages are passed from the 'messages' state
        renderBubble={renderBubble} // Customized bubble rendering
        onSend={(newMessages) => onSend(newMessages)} // Function to handle sending new messages
        user={{
          _id: 1, // Can use a unique ID for the user
        }}
      />

      {/* Keyboard behavior handling based on platform */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the view to expand to 100% of the screen height
  },
});

export default Chat;
