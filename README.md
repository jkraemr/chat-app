# Chat App

The **Chat App** is a mobile application providing users with a chat interface and options to share images and their location. The **Chat App** is built with React Native, a framework for building Android and iOS apps that only requires one codebase.

## Key Features

* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat  provides users with two additional communication features: sending images and location data.
* Data gets stored online and offline.

## Core Technologies

* Node.js
* React Native
* Expo (Open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React)
* Google Firebase

## Test Applications

* XCode as iOS simulator
* Android Studio as Android emulator

## Dependencies
* React Native AsyncStorage
* React Native Community Netinfo
* React Native GestureHandler
* React Native Gifted Chat
* React Native MaskedView
* React Native Navigation / Stack Navigator
* Expo ImagePicker
* Expo Location
* Expo Permissions
* Expo StatusBar

## Technical Specifications 

* The app is written in React Native.
* The app is developed using Expo.
* The app is styled according to a given screen design.
* The app authenticates users anonymously via Google Firebase authentication.
* Chat conversations are stored locally.
* The app lets users pick and send images from the phone’s image library.
* The app lets users take pictures with the device’s camera app, and send them.
* The app stores images in Firebase Cloud Storage.
* The app can be enabled to read the user’s location data.
* Location data are sent via the chat in a map view.
* The chat interface and functionality is created using the Gifted Chat library.
* The app’s codebase contains comments.

## Installation & Setup

#### Expo
* Create Expo account at [expo.dev](https://expo.dev)
* Download Expo application
* Install Expo globally: `npm install expo-cli --global`
* Start project: `expo start` or `npm start`
* Follow instructions in CLI to run project on your virtual or physical devices (Scan QR code etc.)
#### Android Studio
* Download and install [Android Studio](https://developer.android.com/studio)
* Make sure the latest version of `Android SDK Build-Tools` is installed
* Create a `Virtual Device` in the `AVD Manager` with an Android OS of your choice
* Launch your newly created emulator in the `AVD Manager`

## User Stories

*  As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Acknowledgements

This project was built as part of the mentored CareerFoundry Full-Stack Web Development Program / Achievement 5/6 / Native App Development & React Native: https://careerfoundry.com/en/courses/become-a-web-developer/
