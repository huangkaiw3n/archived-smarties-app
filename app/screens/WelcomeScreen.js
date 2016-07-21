'use strict'
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import ViewContainer from '../components/ViewContainer'

class WelcomeScreen extends Component{
  render() {
    return (
      <ViewContainer style={{backgroundColor: "aliceblue", alignItems: "center", justifyContent: "center"}}>
        <Text> StreetSmart </Text>
      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({


})

module.exports = WelcomeScreen
