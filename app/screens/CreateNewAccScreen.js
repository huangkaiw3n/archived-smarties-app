'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import HeaderBarWithLeftTouchableIcon from '../components/HeaderBarWithLeftTouchableIcon'

class CreateNewAccScreen extends Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"aliceblue"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          CREATE A NEW ACCOUNT
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9}}>


        </View>

        <TouchableOpacity onPress={this.onClick} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            LET'S GET STARTED
          </Text>
        </TouchableOpacity>

      </ViewContainer>

    )
  }
}

const styles = StyleSheet.create({

  headerFooterBar: {
    backgroundColor: "steelblue",
    flex:1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    flexDirection: "row",
  },
  barText: {
    color: "white",
    fontSize: 17,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  chevronLeft: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
  }
})

module.exports = CreateNewAccScreen
