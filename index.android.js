/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { View, AppRegistry, StyleSheet, Text, Navigator } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen"
import CreateNewAccScreen from "./app/screens/CreateNewAccScreen"
import LoginScreen from "./app/screens/LoginScreen"
import HeaderBarWithLeftTouchableIcon from "./app/components/HeaderBarWithLeftTouchableIcon"
import MapNaviScreen from "./app/screens/MapNaviScreen"
import AccountSetupVehicleScreen from "./app/screens/AccountSetupVehicleScreen"
import AccountSetupPaymentScreen from "./app/screens/AccountSetupPaymentScreen"
import VehicleConfigScreen from "./app/screens/VehicleConfigScreen"
import ParkingHistoryScreen from "./app/screens/ParkingHistoryScreen"
import Geolocation from "Geolocation"

class StreetSmart extends Component {

  constructor(props){
    super(props)
    this.state = {
      userData: null,
      vehicleNo: "",
      isCarSelected: true,
      isBikeSelected: false,
      userLocation: null,
      lastPosition: null,
    }
    this._updateUserData = this._updateUserData.bind(this)
    this._updateVehicleData = this._updateVehicleData.bind(this)
    this._clearData = this._clearData.bind(this)
  }

  componentWillMount(){
    Geolocation.getCurrentPosition(
     (position) => {
       let latLon = { latitude:position.coords.latitude,
                      longitude:position.coords.longitude}
       this.setState({ userLocation: latLon })
     },
     (error) => {
       alert(error.message)
       this.setState({
         userLocation: {
           latitude:1.3594206,
           longitude:103.8066663
         }})
     },
    //  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   )
   this.watchID = Geolocation.watchPosition((position) => {
     var lastPosition = JSON.stringify(position);
     this.setState({lastPosition});
   })
  }

  _updateUserData(userData){
    this.setState({ userData })
  }

  _updateVehicleData(vehicleData){
    console.log(vehicleData)
    this.setState({
      vehicleNo: vehicleData.vehicleNo,
      isCarSelected: vehicleData.isCarSelected,
      isBikeSelected: vehicleData.isBikeSelected,
     })
  }

  _clearData(){
    this._updateUserData(null)
    this._updateVehicleData(null)
  }

  _renderScene(route, navigator){
    var globalNavigatorProps = { navigator }

    switch(route.identifier){
      case "WelcomeScreen":
        return <WelcomeScreen {...globalNavigatorProps}/>
      case "CreateNewAccScreen":
        return <CreateNewAccScreen {...globalNavigatorProps}/>
      case "LoginScreen":
        return <LoginScreen {...globalNavigatorProps}/>
      case "MapNaviScreen":
        return <MapNaviScreen {...globalNavigatorProps}/>
      case "AccountSetupVehicleScreen":
        return <AccountSetupVehicleScreen {...globalNavigatorProps}/>
      case "AccountSetupPaymentScreen":
        return <AccountSetupPaymentScreen {...globalNavigatorProps}/>
      case "VehicleConfigScreen":
        return <VehicleConfigScreen {...globalNavigatorProps}/>
      case "ParkingHistoryScreen":
        return <ParkingHistoryScreen parkingHistoryData={route.parkingHistoryData} {...globalNavigatorProps}/>
      default:
        return <View style={{flex:1, color:"red"}}/>
      }

    }

  render() {
    return (
      <Navigator
        initialRoute = {{identifier: "MapNaviScreen"}}
        ref="appNavigator"
        userData = {this.state.userData}
        vehicleNo = {this.state.vehicleNo}
        isCarSelected={this.state.isCarSelected}
        isBikeSelected={this.state.isBikeSelected}
        userLocation = {this.state.userLocation}
        updateUserData={this._updateUserData}
        updateVehicleData={this._updateVehicleData}
        clearData={this._clearData}
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route)=> ({
          ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight})} />
    )
  }
}

const styles = StyleSheet.create({
  navigatorStyles:{

  }
})

AppRegistry.registerComponent("StreetSmart", () => StreetSmart);
