import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

  render() {

    let name = this.props.route.params.name;
    let bgColor = this.props.route.params.bgColor;

    this.props.navigation.setOptions({ title: name });

    return (

      <View style={styles.container}>

        <View style={{ ...styles.container, backgroundColor: bgColor }}>
          {/* <Text style={styles.textLight}>Hello {name} !</Text> */}
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',

  },

  textLight: {
    color: '#000',
    fontSize: 30,
  },

});
