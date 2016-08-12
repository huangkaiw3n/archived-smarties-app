"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import { Fumi } from "react-native-textinput-effects";

class LoginScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      pass: "",
    }
  }

  _navigateToMapNaviScreen = () => {
    if (this.state.email === "" || this.state.pass === ""){
      this._alertEmptyFields()
    }
    else{
    // resetTo(route) clears the existing route stack unlike push(route)
    this.props.navigator.props.updateUserData(this.state)
    this.props.navigator.resetTo({
      identifier:"MapNaviScreen",
      })
    }
  }

  _alertEmptyFields(){
    const alertMessage = "Please enter a valid account"
    Alert.alert(
      "Invalid Account Information",
     alertMessage,
      [
        {text: "Okay"},
      ]
    )
  }

  _setEmail = (email) => {
    this.setState({email})
  }

  _setPass = (pass) => {
    this.setState({pass})
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          LOGIN
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9, justifyContent:"flex-start", }}>
          <Fumi
            style={{ marginTop: 3 }}
            label={"Email"}
            iconClass={MaterialsIcon}
            iconName={"email"}
            iconColor={"#f95a25"}
            keyboardType={"email-address"}
            returnKeyType="next"
            maxLength={50}
            onChangeText={this._setEmail}
            value={this.state.email}
            autoCorrect={false}
          />
          <Fumi
            style={{ marginTop: 3}}
            label={"Password"}
            iconClass={MaterialsIcon}
            iconName={"lock"}
            iconColor={"#f95a25"}
            secureTextEntry={true}
            keyboardType={"default"}
            returnKeyType="next"
            maxLength={50}
            onChangeText={this._setPass}
            value={this.state.pass}
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity onPress={this._navigateToMapNaviScreen} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
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
    fontSize: 20,
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
