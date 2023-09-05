import { StatusBar } from "expo-status-bar";

// Import the screen components
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React Navigation components
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator using createNativeStackNavigator
const Stack = createNativeStackNavigator();

// Define the main component of app
const App = () => {
  return (
    // Wrap the entire app in the NavigationContainer
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
