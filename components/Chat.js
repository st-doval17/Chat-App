import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'; // Import InputToolbar
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types'; // Import PropTypes

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
const db = getFirestore(app);

const Chat = ({ route, navigation, isConnected }) => {
  // Destructuring values from 'route.params'
  const { name, backgroundColor, database } = route.params;

  // PropTypes validation for the component's props
  Chat.propTypes = {
    route: PropTypes.object.isRequired, // Validate that 'route' is an object and is required
    navigation: PropTypes.object.isRequired, // Validate that 'navigation' is an object and is required
    isConnected: PropTypes.bool.isRequired, // Validate that 'isConnected' is a boolean and is required
  };

  // Function to handle sending new chat messages
  const onSend = async (newMessages) => {
    const message = newMessages[0];
    try {
      await addDoc(collection(db, 'messages'), message);
      if (isConnected) {
        // Cache messages in AsyncStorage when there's a connection
        const cachedMessages = [...messages, message];
        AsyncStorage.setItem('cachedMessages', JSON.stringify(cachedMessages));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from Firestore
  const fetchMessagesFromFirestore = () => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (docs) => {
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
  };

  // Function to load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    try {
      const cachedMessagesJson = await AsyncStorage.getItem('cachedMessages');
      if (cachedMessagesJson !== null) {
        const cachedMessages = JSON.parse(cachedMessagesJson);
        setMessages(cachedMessages);
      }
    } catch (error) {
      console.error('Error loading cached messages:', error);
    }
  };

  // Effect to set navigation options and load messages based on 'isConnected'
  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubMessages;

    if (isConnected) {
      unsubMessages = fetchMessagesFromFirestore();
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected, navigation]);

  // Create a function to conditionally render InputToolbar
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: route.params.userId,
          name: route.params.name,
        }}
        // Pass the renderInputToolbar function as a prop
        renderInputToolbar={renderInputToolbar}
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
