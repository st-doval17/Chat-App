# React Native Chat App


![Chat_Screenshot](https://github.com/st-doval17/Chat-App/assets/131451577/55bd5456-63a5-496f-92ce-75d36b9d944a)


A chat app for mobile devices built with React Native, Expo, and Google Firestore Database. This app allows users to send messages, images, and share their location seamlessly.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Installation and Usage Instructions](#installation-and-usage-instructions)
- [Reflections](#reflections)



## Introduction

The React Native Mobile Chat App is a versatile and user-friendly application designed to facilitate real-time communication on mobile devices. It enables users to exchange messages, share images, and their location with friends and family members.

## Features

- **User Authentication:** Users can log in anonymously using Google Firebase authentication.

- **Chat Interface:** The app provides a chat interface with text input, message history, and real-time updates.

- **Media Sharing:** Users can send images from their device's library or take pictures with the camera app and share them within the chat.

- **Location Sharing:** Share your current location with friends through an integrated map view.

- **Offline Access:** Messages are stored locally, allowing users to access chat history even when offline.

- **Accessibility:** The app is designed to be compatible with screen readers, ensuring inclusivity.

## Technical Requirements

- **React Native:** The app is built using React Native, providing a cross-platform solution.

- **Expo:** Expo is used for development and deployment, simplifying the process.

- **Firestore Database:** Chat conversations are stored in Google Firestore Database for real-time synchronization.

- **Firebase Authentication:** User authentication is handled anonymously through Google Firebase.

- **Storage:** Images are stored in Firebase Cloud Storage for efficient media sharing.

## Installation and Usage Instructions


Development Environment Setup:

**Expo and Node:**
- Create an Expo account.
- Install Expo CLI globally with npm install -g expo-cli.
- Ensure Node is installed (version 16.19.0 recommended).
- Android Studio (for Android Emulator):
- Download and install Android Studio from official website.
- Follow the Expo Android Development Environment guide for detailed instructions.


This app uses Firebase as the backend database. **To configure Firebase:**
- Visit the Firebase Console and create a new project.
- In the "Rules" tab, change "allow read, write: if false;" to "allow read, write: if true;".
- Set up Firebase Authentication (Anonymous Authentication is used in this app) and Firestore Database. Enable anonymous authentication in Firebase.
- Obtain the Firebase configuration object for your project and replace the firebaseConfig object in App.js with your credentials.

**Base Dependencies (Version 16.19.0):**
- npm install 16.19.0

**Firebase:**
- npm i firebase

**Expo Dependencies:**
- npm i expo
- npm i whatwg-fetch@3.6.2 (to avoid image-related issues)
- expo install expo-av
- expo install expo-image-picker
- expo install react-native-maps
- expo install expo-location
- expo install expo-media-library

**React Native and Navigation:**
- npm install @react-native-async-storage/async-storage
- npm install @react-native-community/netinfo
- npm install @react-navigation/native
- npm install @react-navigation/native-stack

**Other Dependencies:**
- npm install react-native
- npm install react-native-gifted-chat
- npm install react-native-safe-area-context
- npm install react-native-screens

## Reflections

Reflecting on the project, the most significant challenge I encountered was implementing the location-sharing feature. It required corrections in the onsend function of my code, emphasizing the importance of meticulous logic and problem-solving skills in the development process. This project underscored the significance of creating user-friendly and efficient mobile applications while maintaining a clean and well-documented codebase.


