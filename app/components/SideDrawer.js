"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Navigator } from "react-native"
import DrawerLayout from "react-native-drawer-layout"
import Icon from "react-native-vector-icons/Entypo"

const alertMessage = "Are you sure you want to log out?"

class SideDrawer extends Component{

  openSideDrawer(){
    this.refs["DRAWER_LAYOUT"].openDrawer()
  }

  _logOutHandler(){
    Alert.alert(
      "Are you sure?",
     alertMessage,
      [
        {text: "Cancel"},
        {text: "Yes", onPress: () => {
          this.props.navigator.resetTo({identifier: "WelcomeScreen"})}
        },
      ]
    )
  }

  _vehicleConfigHandler = () => {
    if (!this.props.navigator.props.vehicleData) {
      this.props.alertSetUpRequired()
    }
    else {
      this.props.navigator.push({identifier: "VehicleConfigScreen"})
    }
  }

  render() {

    if (this.props.navigator.props.userData === null){
      var sideDrawerView = (
        <View style={styles.sideDrawerView}>
          <Text style={styles.headingsText}>
            ACCOUNT
          </Text>

          <TouchableOpacity onPress={(event) => this.props.navigator.resetTo({identifier: "WelcomeScreen"})} style={[styles.sideTabs, {marginTop:10}]}>
            <Text style={styles.labelsText}>
            Log in or create a new account
            </Text>
          </TouchableOpacity>

        </View>
      );

    }
    else{
      var sideDrawerView = (
        <View style={styles.sideDrawerView}>
          <Text style={styles.headingsText}>
            USER
          </Text>
          <Text style={[styles.labelsText, {marginLeft: 15}]}>
            {this.props.navigator.props.userData.email}
          </Text>
          <Text style={styles.headingsText}>
            VEHICLE
          </Text>

          <TouchableOpacity onPress={this._vehicleConfigHandler} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Vehicle No.
            </Text>
            <Text style={[styles.labelsText, {color:"darkgrey"}]}>
              {this.props.navigator.props.vehicleData ? this.props.navigator.props.vehicleData.vehicleNo : ""}
            </Text>
            <Icon name="chevron-thin-right" style={styles.chevronRight}></Icon>
          </TouchableOpacity>

          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={styles.labelsText}>
              Parking History
            </Text>
          </TouchableOpacity>

          <Text style={styles.headingsText}>
            PAYMENT
          </Text>

          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Credit Balance
            </Text>
            <Text style={[styles.labelsText, {color:"darkgrey"}]}>
              {/*credit balance amount here*/}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={styles.labelsText}>
              Top Up Credit
            </Text>
          </TouchableOpacity>

          <Text style={styles.headingsText}>
            ACCOUNT
          </Text>

          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={styles.labelsText}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._logOutHandler()} style={styles.sideTabs}>
            <Text style={styles.labelsText}>
              Log Out
            </Text>
          </TouchableOpacity>

        </View>
      );
    }


    return (
      <DrawerLayout
      ref="DRAWER_LAYOUT"
      drawerWidth={300}
      drawerPosition={DrawerLayout.positions.Left}
      //drawerLockMode="locked-closed"
      renderNavigationView={() => sideDrawerView}>
        {this.props.children}
      </DrawerLayout>
    )
  }
}




const styles = StyleSheet.create({
  sideDrawerView: {
    flex: 1,
    backgroundColor: "ghostwhite",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: (Platform.OS === "ios") ? 20:0,
  },
  headingsText: {
    marginLeft: 15,
    marginTop: 40,
    fontSize: 15,
    textAlign: "left",
    color: "darkgrey",
  },
  labelsText: {
    fontSize: 15,
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
  chevronRight: {
    alignSelf: "center",
    fontSize: 15,
    color: "darkgrey",
  },
})

module.exports = SideDrawer
