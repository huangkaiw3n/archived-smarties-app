'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import DrawerLayout from 'react-native-drawer-layout'

class SideDrawer extends Component{

  openSideDrawer(){
    this.refs['DRAWER_LAYOUT'].openDrawer()
  }

  render() {
    var sideDrawerView = (
      <View style={styles.sideDrawerView}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <DrawerLayout
      ref='DRAWER_LAYOUT'
      drawerWidth={300}
      drawerPosition={DrawerLayout.positions.Left}
      renderNavigationView={() => sideDrawerView}>
        {this.props.children}
      </DrawerLayout>
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
  sideDrawerView: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "flex-start",
    marginTop: (Platform.OS === 'ios') ? 20:0,
  },
})

module.exports = SideDrawer
