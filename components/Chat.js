import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

// Initialize Firebase with own configuration
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

const Chat = ({ route, navigation, isConnected, storage }) => {
  // Destructuring values from 'route.params'
  const { name, backgroundColor, userId } = route.params;

  // PropTypes validation for the component's props
  Chat.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    storage: PropTypes.object.isRequired,
    currentMessage: PropTypes.object,
  };

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

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from Firestore
  const fetchMessagesFromFirestore = () => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        const messageData = {
          _id: doc.id,
          ...doc.data(),
        };

        if (
          messageData.createdAt instanceof Timestamp ||
          messageData.createdAt === null
        ) {
          messageData.createdAt = messageData.createdAt
            ? messageData.createdAt.toDate()
            : new Date();
        } else {
          console.warn('Invalid createdAt field:', messageData.createdAt);
        }

        newMessages.push(messageData);

        // Cache messages directly as they are loaded
        if (isConnected) {
          AsyncStorage.setItem(
            'cachedMessages',
            JSON.stringify([...messages, messageData])
          );
        }
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

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userId,
          name: name,
        }}
        renderInputToolbar={renderInputToolbar}
        renderActions={(props) => renderCustomActions({ ...props, storage })}
        renderBubble={renderBubble}
        renderCustomView={renderCustomView}
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
