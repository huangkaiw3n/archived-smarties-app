'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import HeaderBarWithLeftTouchableIcon from '../components/HeaderBarWithLeftTouchableIcon'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';

class LoginScreen extends Component{
  constructor(props){
    super(props)
  }

  _navigateToMapNaviScreen(){
    // resetTo(route) clears the existing route stack unlike push(route)
    this.props.navigator.resetTo({
      identifier:"MapNaviScreen",
    })
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"aliceblue"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          LOGIN
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9, justifyContent:"flex-start", }}>
          <Fumi
            style={{ marginTop: 3 }}
            label={'Email'}
            iconClass={MaterialsIcon}
            iconName={'email'}
            iconColor={'#f95a25'}
            keyboardType={'email-address'}
          />
          <Fumi
            style={{ marginTop: 3}}
            label={'Password'}
            iconClass={MaterialsIcon}
            iconName={'lock'}
            iconColor={'#f95a25'}
            secureTextEntry={true}
            keyboardType={'default'}
          />
        </View>

        <TouchableOpacity onPress={(event) => this._navigateToMapNaviScreen()} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            LOGIN
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
  },
})

module.exports = LoginScreen
