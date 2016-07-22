'use strict'
import React, { Component } from 'react'
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'

class WelcomeScreen extends Component{
  render() {
    return (
      <ViewContainer style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.welcomeTitle}> StreetSmart </Text>
        <Icon name="car" style={styles.carIcon}></Icon>

        <TouchableOpacity onPress={this.onClick} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            CREATE A NEW ACCOUNT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onClick}>
          <Text style={styles.genericTextLink}>
            Have an account?
            <Text style={styles.genericTextLinkBold}>
              {" Login"}
            </Text>
          </Text>
        </TouchableOpacity>

      </ViewContainer>

    )
  }
}

const styles = StyleSheet.create({

  welcomeTitle: {
    color: "steelblue",
    fontSize: 40,
    fontWeight: '200',
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
    flexDirection: "row",
    shadowColor: "grey",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "200",
    textAlign: "center",
  },
  genericTextLink: {
    color: "steelblue",
    fontSize: 16,
    fontWeight: '200',
    textAlign: "center",
    textDecorationLine: "underline",
    margin: 30,
  },
  genericTextLinkBold: {
    color: "steelblue",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    textDecorationLine: "underline",
    margin: 30,
  },
})

module.exports = WelcomeScreen
