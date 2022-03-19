import React from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

export default class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };

  }

  componentDidMount() {

    let name = this.props.route.params.name;

    this.setState({
      // Create static messages
      messages: [
        // Normal message
        {
          _id: 1,
          text: `Hello ${name}!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/people',
          },
        },
        // System message
        {
          _id: 2,
          text: `${name} joined the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
            user={{
              _id: 1,
            }}
          />
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
