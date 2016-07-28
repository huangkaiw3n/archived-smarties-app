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

class StreetSmart extends Component {

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
        return <MapNaviScreen userData={route.userData} isSetUp={route.isSetUp} {...globalNavigatorProps}/>
      case "AccountSetupVehicleScreen":
        return <AccountSetupVehicleScreen {...globalNavigatorProps}/>
      case "AccountSetupPaymentScreen":
          return <AccountSetupPaymentScreen vehicleData={route.vehicleData} {...globalNavigatorProps}/>
      default:
        return <View style={{flex:1, color:"red"}}/>
      }

    }

  render() {
    return (
      <Navigator
        initialRoute = {{identifier: "WelcomeScreen"}}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route)=> ({
          ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight})} />
    );
  }
}

const styles = StyleSheet.create({
  navigatorStyles:{

  }
})

AppRegistry.registerComponent("StreetSmart", () => StreetSmart);
