"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import MapViewContainer from "../components/MapViewContainer";
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithMenuIcon from "../components/HeaderBarWithMenuIcon"
import SideDrawer from "../components/SideDrawer"

class MapNaviScreen extends Component{
  constructor(props){
    super(props)
    this._updateSelectedRoad = this._updateSelectedRoad.bind(this)
    this._openSideDrawer = this._openSideDrawer.bind(this)
    this._closeBottomDrawer = this._closeBottomDrawer.bind(this)
    this.state = {
      roadname: "",
      openBottomDrawer:false,
      footerText: "PARK HERE",
    }
  }

  componentDidMount(){
    if (!this.props.navigator.props.vehicleData && this.props.navigator.props.userData){
      this._alertSetUp()
    }
  }

  _alertSetUp(){
    const alertMessage = "Would you like to set up Streetsmart now so that you can pay easily for your future parking?"
    Alert.alert(
      "Welcome to Streetsmart",
     alertMessage,
      [
        {text: "Not now"},
        {text: "Yes", onPress: () => this.props.navigator.push({identifier: "AccountSetupVehicleScreen"})},
      ]
    )
  }

  _updateSelectedRoad(roadname){
    this.setState({ roadname })
  }

  _openSideDrawer(){
    this.refs["SIDE_DRAWER"].openSideDrawer()
  }

  _parkHereButtonHandler = () => {
    console.log("open drawer fired")
    // let toggleDrawerState = !this.state.openBottomDrawer
    if (!this.state.openBottomDrawer){
      this.setState( {openBottomDrawer:true} )
      this.setState( {footerText:"START PARKING SESSION"})
    }

    if(this.state.footerText === "START PARKING SESSION"){
      console.log("PARKING IN PROGRESS")
    }
  }

  _closeBottomDrawer(){
    console.log("close drawer fired")
    this.setState( {openBottomDrawer:false} )
    this.setState( {footerText:"PARK HERE"})
  }

  render() {

    if (!this.state.openBottomDrawer) {
      var bottomDrawerView = (
        <Text>{this.state.roadname}</Text>
      );
    }
    else {
      var bottomDrawerView = (
        <Text>OPEN NOW</Text>
      );
    }

    return (
      <SideDrawer navigator={this.props.navigator} ref="SIDE_DRAWER">
        <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

          <HeaderBarWithMenuIcon onPressMenu={this._openSideDrawer} nav={this.props.navigator}>
            STREETSMART
          </HeaderBarWithMenuIcon>

          <View style={{flex:9, justifyContent:"flex-start"}}>
            <MapViewContainer
            style={{flex:9}}
            userLocation={this.props.navigator.props.userLocation}
            handler={this._updateSelectedRoad}
            isBottomDrawerOpen={this.state.openBottomDrawer}
            closeBottomDrawer={this._closeBottomDrawer}>
            </MapViewContainer>
            <View style={(this.state.openBottomDrawer) ? {flex:6} : {flex:0.7}}>
              {bottomDrawerView}
            </View>
          </View>

          <TouchableOpacity onPress={this._parkHereButtonHandler} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
            <Text style={styles.barText}>
              {this.state.footerText}
            </Text>
          </TouchableOpacity>

        </ViewContainer>
      </SideDrawer>
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
    fontSize: 17,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  genericText: {
    color: "steelblue",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
  genericTextLink: {
    color: "steelblue",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
})

module.exports = MapNaviScreen
