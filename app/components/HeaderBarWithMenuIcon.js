"use strict"
import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Entypo"

class HeaderBarWithMenuIcon extends Component{

  render() {
    return (
      <View style={styles.viewContainerHeader}>
        <TouchableOpacity onPress={(event) => this._openMenu()} style={styles.headerFooterBar}>
          <Icon name="menu" style={styles.menu}></Icon>
        </TouchableOpacity>
        <Text style={styles.barText}>
          {this.props.children}
        </Text>
      </View>
    )
  }

  _openMenu(){
    this.props.onPressMenu()
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
    fontSize: 17,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
    alignSelf: "center",
  },
  menu: {
    alignSelf: "center",
    fontSize: 40,
    color: "white",
  }
})

module.exports = HeaderBarWithMenuIcon
