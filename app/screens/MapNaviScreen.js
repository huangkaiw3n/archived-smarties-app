'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapViewContainer from '../components/MapViewContainer';
import ViewContainer from '../components/ViewContainer'
import HeaderBarWithMenuIcon from '../components/HeaderBarWithMenuIcon'
import SideDrawer from '../components/SideDrawer'

class MapNaviScreen extends Component{
  constructor(props){
    super(props)
    this._updateSelectedRoad = this._updateSelectedRoad.bind(this)
    this._openSideDrawer = this._openSideDrawer.bind(this)
    this.state = {
      roadname: "",
    }
  }

  _updateSelectedRoad(roadname){
    this.setState({ roadname })
  }

  _openSideDrawer(){
    this.refs['SIDE_DRAWER'].openSideDrawer()
  }

  render() {

    return (
      <SideDrawer ref='SIDE_DRAWER'>
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"aliceblue"}}>

        <HeaderBarWithMenuIcon onPressMenu={this._openSideDrawer} nav={this.props.navigator}>
          STREETSMART
        </HeaderBarWithMenuIcon>

        <View style={{flex:9, justifyContent:"flex-start"}}>

        <MapViewContainer handler={this._updateSelectedRoad}></MapViewContainer>
        </View>
        <Text style={{flex:0.5}}>{this.state.roadname}</Text>

        <TouchableOpacity onPress={(event) => this._openSideDrawer()} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            PARK HERE
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
