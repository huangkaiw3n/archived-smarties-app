"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import { Fumi } from "react-native-textinput-effects";

class CreateNewAccScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      email: "",
      pass: "",
      mobile: "",
    }
  }

  _navigateToMapNaviScreen = () => {
    if (this.state.email === "" || this.state.pass === "" || this.state.mobile === ""){
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
    const alertMessage = "Please fill up all fields"
    Alert.alert(
      "Invalid Personal Information",
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

  _setMobile = (mobile) => {
    this.setState({mobile})
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          CREATE A NEW ACCOUNT
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
          <Fumi
            style={{ marginTop: 3 }}
            label={"Mobile No."}
            iconClass={MaterialsIcon}
            iconName={"smartphone"}
            iconColor={"#f95a25"}
            keyboardType={"numeric"}
            returnKeyType="done"
            maxLength={30}
            onChangeText={this._setMobile}
            value={this.state.mobile}
            autoCorrect={false}
          />
          <Text style={styles.genericText}>
            By creating an account, I agree to Streetsmart's
          </Text>
          <TouchableOpacity>
            <Text style={styles.genericTextLink}>
              Terms of Use and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this._navigateToMapNaviScreen} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
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
    flexDirection: "row",
  },
  barText: {
    color: "white",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  genericText: {
    color: "steelblue",
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  genericTextLink: {
    color: "steelblue",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
  },
})

module.exports = CreateNewAccScreen
