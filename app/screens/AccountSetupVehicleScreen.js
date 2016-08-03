"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert , Platform} from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

class AccountSetupVehicleScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      vehicleNo: "",
      isCarSelected:true,
      isBikeSelected:false,
    }
  }

  _alertVehicleNo(){
    const alertMessage = "Please key in your license plate number."
    Alert.alert(
      "Invalid Vehicle Information",
     alertMessage,
      [
        {text: "Okay"},
      ]
    )
  }

  _navigateToAccountSetupPaymentScreen = () => {
    // resetTo(route) clears the existing route stack unlike push(route)
    if (this.state.vehicleNo === ""){
      this._alertVehicleNo()
    }
    else{
      this.props.navigator.props.updateVehicleData(this.state)
      this.props.navigator.push({
        identifier:"AccountSetupPaymentScreen",
      })
    }
  }

  _toggleSelectedVehicle() {
    this.setState({
      isCarSelected: !this.state.isCarSelected,
      isBikeSelected: !this.state.isBikeSelected,
    })
  }

  _motorCarPressed = () => {
    if (!this.state.isCarSelected){
      this._toggleSelectedVehicle()
    }
  }

  _motorBikePressed = () => {
    if (!this.state.isBikeSelected){
      this._toggleSelectedVehicle()
    }
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
              <Ionicons name="md-arrow-dropright" style={[styles.selectedIcon, {color:"darkgrey", fontSize:50, marginLeft: 30, marginRight: 30}]}></Ionicons>
            <View style={[styles.circleBorder, {backgroundColor: "darkgrey"}]}>
              <Ionicons name="logo-usd" style={styles.selectedIcon}></Ionicons>
            </View>
          </View>
          <Text style={styles.headingsText}>
            VEHICLE NO.
          </Text>

          <View style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Vehicle No.
            </Text>
            <View style={{flex:4, alignSelf:"stretch", borderColor: "darkgrey", borderLeftWidth: 1, paddingLeft:8}}>
              <TextInput
              style={[styles.labelsText, {flex:1, padding:0}]}
              underlineColorAndroid="transparent"
              onChangeText={(vehicleNo) => this.setState({vehicleNo})}
              value={this.state.vehicleNo}
              defaultValue=""/>
            </View>
          </View>
          <Text style={styles.headingsText}>
            VEHICLE TYPE
          </Text>

          <TouchableOpacity onPress={this._motorCarPressed} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Motor Car
            </Text>
            <EvilIcons
            name="check"
            style={[styles.check, this.state.isCarSelected ? {opacity:1} : {opacity:0}]}>
            </EvilIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._motorBikePressed} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Motor Bike
            </Text>
            <EvilIcons
            name="check"
            style={[styles.check, this.state.isBikeSelected ? {opacity:1} : {opacity:0}]}>
            </EvilIcons>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this._navigateToAccountSetupPaymentScreen} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            ADD VEHICLE
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
})

module.exports = AccountSetupVehicleScreen
