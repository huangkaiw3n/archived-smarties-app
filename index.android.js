/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, AppRegistry, StyleSheet, Text, Navigator } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen'
import CreateNewAccScreen from './app/screens/CreateNewAccScreen'
import HeaderBarWithLeftTouchableIcon from './app/components/HeaderBarWithLeftTouchableIcon'
import MapNaviScreen from './app/screens/MapNaviScreen'

class StreetSmart extends Component {

  _renderScene(route, navigator){
    var globalNavigatorProps = { navigator }

    switch(route.identifier){
      case "WelcomeScreen":
        return <WelcomeScreen {...globalNavigatorProps}/>
      case "CreateNewAccScreen":
        return <CreateNewAccScreen {...globalNavigatorProps}/>
      case "MapNaviScreen":
        return <MapNaviScreen {...globalNavigatorProps}/>
      default:
        return <View style={{flex:1, color:"red"}}/>
      }

    }

  render() {
    return (
      <Navigator
        initialRoute = {{identifier: "MapNaviScreen"}}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene} />
    );
  }
}

const styles = StyleSheet.create({
  navigatorStyles:{

  }
})

AppRegistry.registerComponent('StreetSmart', () => StreetSmart);
