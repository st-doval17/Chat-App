import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  // Determine the text color based on the background color
  const textColor = backgroundColor === "#090C08" ? "#FFFFFF" : "#000000";

  // Use useEffect to set the navigation options
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Render the chat screen with dynamic background and text color
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Hello {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Chat;
