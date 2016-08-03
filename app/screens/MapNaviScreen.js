"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Picker, Platform } from "react-native"
import MapViewContainer from "../components/MapViewContainer";
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithMenuIcon from "../components/HeaderBarWithMenuIcon"
import SideDrawer from "../components/SideDrawer"
import Icon from "react-native-vector-icons/Entypo"

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
      parkingDuration: 1,
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
        <View style={{flex:1.3, flexDirection:"row", alignItems:"center", paddingLeft:20, paddingRight:20, borderWidth: 1, borderColor: "gainsboro",}}>
          <View style={{flex:5}}>
            <Text style={{color:"black", fontSize:16}}>Parking Lot</Text>
          </View>
          <View style={{flex:3}}>
            <Text style={{color:"black", fontSize:16}}>{this.state.roadname}</Text>
          </View>
        </View>

      );
    }
    else {
      var bottomDrawerView = (
        <View style={{flex:7, flexDirection:"column", alignItems:"stretch", paddingLeft:20, borderWidth: 1, borderColor: "gainsboro",}}>
          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Vehicle No.
            </Text>
            <View style={{flexDirection:"row", marginRight:10, flex:2}}>
              <Text style={[styles.labelsText, {color:"darkgrey", flex:2}]}>
                SKL4231M
              </Text>
              <Icon name="chevron-thin-right" style={styles.chevronRight}></Icon>
            </View>
          </TouchableOpacity>
          <View style={[styles.sideTabs, (Platform.OS === "ios") ? {height:200}:{}]}>
            <Text style={[styles.labelsText, {flex:2}]}>
              Estimated Parking Duration
            </Text>
            <Picker
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.parkingDuration}
            onValueChange={(parkingDuration) => this.setState({parkingDuration})}>
              <Picker.Item label="1 Hr" value={1} />
              <Picker.Item label="2 Hr" value={2} />
              <Picker.Item label="3 Hr" value={3} />
              <Picker.Item label="4 Hr" value={4} />
              <Picker.Item label="5 Hr" value={5} />
              <Picker.Item label="6 Hr" value={6} />
              <Picker.Item label="7 Hr" value={7}/>
              <Picker.Item label="8 Hr" value={8} />
              <Picker.Item label="9 Hr" value={9} />
              <Picker.Item label="10 Hr" value={10} />
              <Picker.Item label="11 Hr" value={11}/>
              <Picker.Item label="12 Hr" value={12}/>
            </Picker>
          </View>

        </View>

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
            {bottomDrawerView}
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
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  genericText: {
    color: "steelblue",
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  genericTextLink: {
    color: "steelblue",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  sideTabs: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: "gainsboro",
    backgroundColor: "ghostwhite",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  labelsText: {
    fontSize: 16,
    textAlign: "left",
    color: "black",
  },
  chevronRight: {
    alignSelf: "center",
    fontSize: 18,
    color: "darkgrey",
  },
  pickerStyle: {
    marginTop: ((Platform.OS === "ios") ? -10:0),
    padding:0,
    alignSelf: "center",
    width:110,
  }
})

module.exports = MapNaviScreen
