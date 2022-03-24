import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const chatBg = {
  color01: '#090c08',
  color02: '#474056',
  color03: '#8a95a5',
  color04: '#b9c6ae'
}

let bgColor = '';

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bgColor: ''
    };

  }

  changeChatBg = (newColor) => {
    bgColor = chatBg.color01;
    this.setState({ bgColor: newColor });
  };


  render() {

    const bgImg = require('../assets/bg-img.png');

    return (

      <ImageBackground source={bgImg} style={styles.bgImg}>

        <View
          accessible={false}
          accessibilityRole='header'
          accessibilityLabel='Chat App'
          accessibilityHint='Title of the app'
          style={styles.container}>
          <Text style={styles.title}>Chat App</Text>

          <View style={styles.mainBox}>
            <View style={styles.nameBox}>
              <FontAwesomeIcon name='user' style={styles.userIcon} size={25} color='#757083' />
              <TextInput
                accessible={true}
                accessibilityRole='search'
                accessibilityLabel='Your Name'
                accessibilityHint='Enter the name you want to use in your chat session'
                style={styles.nameInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            <View style={styles.colorBox}>
              <View style={styles.colorTextBox}>
                <Text style={styles.colorText}>Choose Background Color: </Text>
              </View>
              <View style={styles.color}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole='combobox'
                  accessibilityLabel='Dark and black background'
                  accessibilityHint='Set Marshland as dark and black background color for chat view'
                  style={styles.color01}
                  onPress={() => this.changeChatBg(chatBg.color01)}>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole='combobox'
                  accessibilityLabel='Dark purple background'
                  accessibilityHint='Set Mulled vine as dark purple background color for chat view'
                  style={styles.color02}
                  onPress={() => this.changeChatBg(chatBg.color02)}>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole='combobox'
                  accessibilityLabel='Grey blue background'
                  accessibilityHint='Set Regent Gray as grey blue background color for chat view'
                  style={styles.color03}
                  onPress={() => this.changeChatBg(chatBg.color03)}>
                </TouchableOpacity>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole='combobox'
                  accessibilityLabel='Light green background'
                  accessibilityHint='Set Clay Ash as light green background color for chat view'
                  style={styles.color04}
                  onPress={() => this.changeChatBg(chatBg.color04)}>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.buttonBox}>
              <TouchableOpacity
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Start Chatting'
                accessibilityHint='Navigate to chat view'
                style={styles.buttonStyle}
                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}><Text style={styles.buttonText}>Start Chatting</Text></TouchableOpacity>
            </View>

          </View>
        </View>

      </ImageBackground >

    )

  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgImg: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    marginTop: 55,
  },


  mainBox: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexShrink: 0,
    height: '44%',
    width: '88%',
    backgroundColor: '#fff',
    marginBottom: 30,
  },

  nameBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '88%',
    height: 55,
    borderColor: '#757083',
    borderWidth: 1.5,
    opacity: 0.5,
  },

  userIcon: {
    margin: 15,
  },

  nameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    height: 55,
    width: '88%',
  },

  colorBox: {
    justifyContent: 'center',
    width: '88%',
    height: 60,
    marginBottom: 10,
  },

  colorTextBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '88%',
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginTop: 5,
    marginBottom: 8,
  },

  color: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexShrink: 0,
    height: 40,
    width: 230,
  },

  color01: {
    backgroundColor: '#090C08',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color02: {
    backgroundColor: '#474056',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color03: {
    backgroundColor: '#8a95a5',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color04: {
    backgroundColor: '#b9C6ae',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  buttonBox: {
    height: 70,
    width: '88%',
    marginBottom: -10,
  },

  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    height: 60,
    width: '100%',
    backgroundColor: '#757083',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
  },

});