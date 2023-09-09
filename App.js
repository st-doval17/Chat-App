import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore functions

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
  const db = getFirestore(app); // Initialize Firestore

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        {/* Pass the Firestore database reference as 'database' prop to the Chat component */}
        <Stack.Screen name='Chat'>
          {(props) => <Chat {...props} database={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
