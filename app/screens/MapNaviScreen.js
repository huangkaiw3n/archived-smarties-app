'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapViewContainer from '../components/MapViewContainer';
import ViewContainer from '../components/ViewContainer'
import HeaderBarWithMenuIcon from '../components/HeaderBarWithMenuIcon'

class MapNaviScreen extends Component{
  constructor(props){
    super(props)

    this.updateSelectedRoad = this.updateSelectedRoad.bind(this)
    this.state = {
      roadname: "",
    }
  }

  updateSelectedRoad(roadname){
    this.setState({ roadname })
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"aliceblue"}}>

        <HeaderBarWithMenuIcon nav={this.props.navigator}>
          STREETSMART
        </HeaderBarWithMenuIcon>

        <View style={{flex:9, justifyContent:"flex-start"}}>

        <MapViewContainer handler={this.updateSelectedRoad}></MapViewContainer>
        </View>
        <Text style={{flex:0.5}}>{this.state.roadname}</Text>

        <TouchableOpacity onPress={this.onClick} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            PARK HERE
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
