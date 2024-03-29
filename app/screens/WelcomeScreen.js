"use strict"
import React, { Component } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import ViewContainer from "../components/ViewContainer"
import Icon from "react-native-vector-icons/FontAwesome"

class WelcomeScreen extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.navigator.props.clearData()
  }

  render() {
    return (
      <ViewContainer style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.welcomeTitle}> StreetSmart </Text>
        <Icon name="car" style={styles.carIcon}></Icon>

        <TouchableOpacity onPress={this._navigateToCreateNewAccScreen} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            CREATE A NEW ACCOUNT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._navigateToLoginScreen}>
          <Text style={styles.genericTextLink}>
            Have an account?
            <Text style={styles.genericTextLinkBold}>
              {" Login"}
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={this._navigateToMapNaviScreen}>
          <Text style={[styles.genericTextLink, {fontSize:20}]}>
            SKIP
          </Text>
        </TouchableOpacity>

      </ViewContainer>

    )
  }

  _navigateToCreateNewAccScreen = () => {
    this.props.navigator.push({
      identifier:"CreateNewAccScreen"
    })
  }

  _navigateToLoginScreen = () => {
    this.props.navigator.push({
      identifier:"LoginScreen"
    })
  }

  _navigateToMapNaviScreen = () => {
    // resetTo(route) clears the existing route stack unlike push(route)
    this.props.navigator.push({
      identifier:"MapNaviScreen",
    })
  }

}

const styles = StyleSheet.create({

  welcomeTitle: {
    color: "steelblue",
    fontSize: 40,
    fontWeight: "200",
    textAlign: "center",
  },
  carIcon: {
    color: "mediumaquamarine",
    fontSize: 115,
    margin: 50,
  },
  buttonContainer: {
    backgroundColor: "steelblue",
    height: 60,
    width: 300,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
  },
  genericTextLink: {
    color: "steelblue",
    fontSize: 18,
    fontWeight: "200",
    textAlign: "center",
    textDecorationLine: "underline",
    margin: 30,
  },
  genericTextLinkBold: {
    color: "steelblue",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    margin: 30,
  },
  skipButton: {
    position: "absolute",
    right: 10,
    bottom:10,
  }
})

module.exports = WelcomeScreen
