"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

class AccountSetupPaymentScreen extends Component{
  constructor(props){
    super(props)
  }

  _navigateToMapNaviScreen(){
    this.props.navigator.resetTo({
      identifier:"MapNaviScreen",
    })
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          ACCOUNT SET UP
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9, justifyContent:"flex-start", }}>
          <View style={{marginTop:20, justifyContent:"center", alignItems:"center", flexDirection:"row", backgroundColor:"ghostwhite"}}>
            <View style={[styles.circleBorder, {backgroundColor: "steelblue"}]}>
              <Ionicons name="md-car" style={styles.selectedIcon}></Ionicons>
            </View>
              <Ionicons name="md-arrow-dropright" style={[styles.selectedIcon, {color:"steelblue", fontSize:50, marginLeft: 30, marginRight: 30}]}></Ionicons>
            <View style={[styles.circleBorder, {backgroundColor: "steelblue"}]}>
              <Ionicons name="logo-usd" style={styles.selectedIcon}></Ionicons>
            </View>
          </View>
          <Text style={styles.headingsText}>
            CREDIT CARD DETAILS
          </Text>

          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              1234 5678 9000 0000
            </Text>
            <Text style={[styles.labelsText, {color:"darkgrey"}]}>

            </Text>
          </TouchableOpacity>

          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={(event) => this.onClick} style={[styles.rowItems, {flex:1}]}>
              <Text style={[styles.labelsText, {flex:1}]}>
                CVV
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={(event) => this.onClick} style={[styles.rowItems, {flex:1}]}>
              <Text style={[styles.labelsText, {flex:1}]}>
                MM/YY
              </Text>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity onPress={(event) => this._navigateToMapNaviScreen()} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            ADD CREDIT CARD
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
  check: {
    alignSelf: "center",
    fontSize: 30,
    color: "limegreen",
  },
  sideDrawerView: {
    flex: 1,
    backgroundColor: "ghostwhite",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  headingsText: {
    marginLeft: 15,
    marginTop: 40,
    fontSize: 13,
    textAlign: "left",
    color: "darkgrey",
  },
  labelsText: {
    fontSize: 13,
    textAlign: "left",
    color: "black",
  },
  sideTabs: {
    height: 45,
    borderWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  selectedIcon: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
  },
  circleBorder: {
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  rowItems: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "whitesmoke",
    borderTopColor: "white",
    borderBottomColor: "white",
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
})

module.exports = AccountSetupPaymentScreen
