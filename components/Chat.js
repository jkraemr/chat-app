import React from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { KeyboardAvoidingView, LogBox, Platform, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiNdQ0WSYolJtpn7ylo4y0VPvrA0kmyu4",
  authDomain: "chat-app-dfe83.firebaseapp.com",
  projectId: "chat-app-dfe83",
  storageBucket: "chat-app-dfe83.appspot.com",
  messagingSenderId: "835977084681",
  appId: "1:835977084681:web:84318ee75a0fd6c3681dd8"
};

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to Firestore messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.refUserMessages = null;

    // Remove warning messages
    LogBox.ignoreLogs([
      'Setting a timer',
      'Cannot update a component',
      'Animated.event now requires a second argument for options',
      'Animated: `useNativeDriver` was not specified',
      'Possible Unhandled Promise Rejection',
    ]);

  };

  componentDidMount() {

    let name = this.props.route.params.name;

    // Detect connection status
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        // Authenticate user anonymously
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          // Update user state 
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/people',
            },
          });

          // Listen for collection updates
          this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate);

          // Reference messages of current user
          this.refUserMessages = firebase
            .firestore()
            .collection('messages')
            .where('uid', '==', this.state.uid);
        });

        this.saveMessages();

      } else {
        this.setState({ isConnected: false });
        this.getMessages();
        console.log('offline');
      }
    });

  }

  // Update messages state
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // Get QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages: messages,
    });
  };

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  // Add messages to database
  addMessages() {
    const message = this.state.messages[0];
    // Add new messages to collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || '',
      location: message.location || null,
    });
  }

  // Get chat history from asyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Save new messages
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Delete stored messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // Add messages to current chat and save them to Firebase collection
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#123'
          }
        }}
      />
    )
  }

  // Hide text input when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  // Render button to allow CustomActions selection
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // Render map view when message contains location data
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
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
  }

  render() {

    let name = this.props.route.params.name;
    let bgColor = this.props.route.params.bgColor;

    this.props.navigation.setOptions({ title: name });

    return (

      <View style={styles.container}>

        <View style={{ ...styles.container, backgroundColor: bgColor }}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            user={{
              _id: this.state.user._id,
              name: this.state.name,
              avatar: this.state.user.avatar
            }}
          />
          {/* Avoid hidden input field beneath keyboard on Android devices*/}
          {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null
          }
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});
