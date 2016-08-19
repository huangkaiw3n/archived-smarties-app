"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert , Platform} from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

class VehicleConfigScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: this.props.navigator.props.isCarSelected,
      isBikeSelected: this.props.navigator.props.isBikeSelected,
    }
    this._updateVehNoAndPopScreen = this._updateVehNoAndPopScreen.bind(this)
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

  _toggleSelectedVehicle() {
    this.props.navigator.props.updateVehicleData({
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: !this.state.isCarSelected,
      isBikeSelected: !this.state.isBikeSelected,
    })
    this.setState({
      isCarSelected:!this.state.isCarSelected,
      isBikeSelected:!this.state.isBikeSelected,
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

  _updateVehNoAndPopScreen(){
    this.props.navigator.props.updateVehicleData(this.state)
    this.props.navigator.pop()
  }

  _setVehicleNo = (vehicleNo) => {
    this.setState({vehicleNo})
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator} callBack={this._updateVehNoAndPopScreen}>
          VEHICLE
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:10, justifyContent:"flex-start", }}>

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
              onChangeText={this._setVehicleNo}
              autoCorrect={false}
              value={this.state.vehicleNo}
              placeholder="Your Vehicle No."/>
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

      </ViewContainer>

    )
  }
}

const styles = StyleSheet.create({

  check: {
    alignSelf: "center",
    fontSize: 30,
    color: "limegreen",
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
})

module.exports = VehicleConfigScreen
