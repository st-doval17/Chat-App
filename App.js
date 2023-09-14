import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore'; // Import Firestore functions
import { useNetInfo } from '@react-native-community/netinfo'; // Import useNetInfo
import { Alert } from 'react-native'; // Import Alert
import { getStorage } from 'firebase/storage';

import Start from './components/Start';
import Chat from './components/Chat';

const App = () => {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAx2DUa_kqFc92Vo47YkhiU3H3_EIJOKHc',
    authDomain: 'chat-app-83e48.firebaseapp.com',
    projectId: 'chat-app-83e48',
    storageBucket: 'chat-app-83e48.appspot.com',
    messagingSenderId: '848967168911',
    appId: '1:848967168911:web:02cdbe1082e6c14c5951fa',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const Stack = createNativeStackNavigator();
  const netInfo = useNetInfo(); // Use the useNetInfo hook to get network connectivity status

  // Function to handle network connectivity changes
  useEffect(() => {
    if (!netInfo.isConnected) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else {
      enableNetwork(db);
    }
  }, [netInfo.isConnected, db]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={netInfo.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
