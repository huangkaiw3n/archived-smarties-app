"use strict"
import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"

class HeaderBarWithLeftTouchableIcon extends Component{

  render() {
    return (
      <View style={styles.viewContainerHeader}>
        <TouchableOpacity onPress={this._navigateToPrevScreen} style={styles.headerFooterBar}>
          <Entypo name="chevron-thin-left" style={styles.chevronLeft}></Entypo>
        </TouchableOpacity>
        <Text style={styles.barText}>
          {this.props.children}
        </Text>
      </View>
    )
  }

  _navigateToPrevScreen = () => {
    this.props.nav.pop()
  }
}

const styles = StyleSheet.create({

  viewContainerHeader: {
    flex: 1,
    backgroundColor: "steelblue",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  headerFooterBar: {
    backgroundColor: "steelblue",
    flex:1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  barText: {
    flex:10,
    backgroundColor: "steelblue",
    color: "white",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
    alignSelf: "center",
  },
  chevronLeft: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
  }
})

module.exports = HeaderBarWithLeftTouchableIcon
