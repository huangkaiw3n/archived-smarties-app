'use strict'
import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

class ViewContainer extends Component{
  render() {
    return (
      <View style={[styles.viewContainer, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor:"white",
    marginTop: (Platform.OS === 'ios') ? 20:0,
  },
})

module.exports = ViewContainer
