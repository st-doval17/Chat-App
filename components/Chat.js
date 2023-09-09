import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAx2DUa_kqFc92Vo47YkhiU3H3_EIJOKHc',
  authDomain: 'chat-app-83e48.firebaseapp.com',
  projectId: 'chat-app-83e48',
  storageBucket: 'chat-app-83e48.appspot.com',
  messagingSenderId: '848967168911',
  appId: '1:848967168911:web:02cdbe1082e6c14c5951fa',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

const Chat = ({ route, navigation }) => {
  // Extracting 'name' and 'backgroundColor' from route parameters
  const { name, backgroundColor, database } = route.params;

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    // Save the new message to Firestore using the 'database' prop (not props.db)
    addDoc(collection(db, 'messages'), newMessages[0]); // Use 'db' here
  };

  // Messages state initialization using useState()
  const [messages, setMessages] = useState([]);

  // Define the renderBubble function to customize bubble styles
  const renderBubble = (props) => {
    let bubbleColor = '#000'; // Default bubble color

    if (backgroundColor === '#090C08') {
      // Check if the background color is black
      bubbleColor = '#808080'; // Set bubble color to gray for black background
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bubbleColor, // Set the bubble color
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: route.params.userId, // Extract user ID from route.params
          name: route.params.name, // Extract name from route.params
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
