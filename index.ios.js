/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen'

class StreetSmart extends Component {
  render() {
    return (
      <WelcomeScreen></WelcomeScreen>
    );
  }
}

AppRegistry.registerComponent('StreetSmart', () => StreetSmart);
