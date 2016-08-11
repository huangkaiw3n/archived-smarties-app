"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Picker, Platform, Dimensions } from "react-native"
import MapViewContainer from "../components/MapViewContainer"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithMenuIcon from "../components/HeaderBarWithMenuIcon"
import SideDrawer from "../components/SideDrawer"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import * as Animatable from 'react-native-animatable'

var AnimatedCircleIcon = Animatable.createAnimatableComponent(FontAwesome)
var {height, width} = Dimensions.get('window')

class MapNaviScreen extends Component{
  constructor(props){
    var intervalID
    super(props)
    this._updateSelectedRoad = this._updateSelectedRoad.bind(this)
    this._openSideDrawer = this._openSideDrawer.bind(this)
    this._closeBottomDrawer = this._closeBottomDrawer.bind(this)
    this.state = {
      roadname: "",
      headerText: "STREETSMART",
      footerText: "PARK HERE",
      isBottomDrawerOpen: false,
      isParkingInProgress: false,
      estParkingDuration: 1,
      elapsedDuration:0,
      elapsedHour: "00",
      elapsedMin: "00",
      cost: "$1.00",
    }
  }

  componentDidMount(){
    if (!this.props.navigator.props.vehicleData && this.props.navigator.props.userData){
      this._alertSetUp()
    }
  }

  _alertNeedLogIn(){
    Alert.alert(
      "Please log in to proceed",
      "You must be logged in to start a parking session",
      [
        {text: "Not now"},
        {text: "Yes", onPress: () => this.props.navigator.resetTo({identifier: "WelcomeScreen"})},
      ]
    )
  }

  _alertSetUp(){
    Alert.alert(
      "Welcome to Streetsmart",
      "Would you like to set up Streetsmart now so that you can pay easily for your future parking?",
      [
        {text: "Not now"},
        {text: "Yes", onPress: () => this.props.navigator.push({identifier: "AccountSetupVehicleScreen"})},
      ]
    )
  }

  _alertSetUpRequired(){
    Alert.alert(
      "Set up required",
      "Please set up your account to begin parking.",
      [
        {text: "Not now"},
        {text: "Yes", onPress: () => this.props.navigator.push({identifier: "AccountSetupVehicleScreen"})},
      ]
    )
  }

  _alertParkingStarted(){
    Alert.alert(
      "Parking in progress",
     "Your parking session has begun",
      [
        {text: "OK"},
      ]
    )
  }

  _alertEndParking(){
    Alert.alert(
      "End session",
     "Are you sure you want to end this parking session now?",
      [
        {text: "Cancel"},
        {text: "Yes", onPress: () => {
          this._endParkingSession()}
        },
      ]
    )
  }

  _updateSelectedRoad(roadname){
    this.setState({ roadname })
  }

  _openSideDrawer(){
    this.refs["SIDE_DRAWER"].openSideDrawer()
  }

  _bottomButtonHandler = () => {
    console.log("open drawer fired")
    // let toggleDrawerState = !this.state.isBottomDrawerOpen
    if (!this.props.navigator.props.userData){
      this._alertNeedLogIn()
    }
    else if (!this.props.navigator.props.vehicleData){
      this._alertSetUpRequired()
    }
    else if (!this.state.isBottomDrawerOpen){
      this.setState({
        isBottomDrawerOpen:true,
        headerText:"PARKING DETAILS",
        footerText:"START PARKING SESSION",
      })
    }
    else if (!this.state.isParkingInProgress){
      this.setState({
        isParkingInProgress:true,
        headerText: "PARKING IN PROGRESS",
        footerText:"STOP PARKING",
      },
      () => {
        this._elapsedParkingDurationTimer()
        this._alertParkingStarted()
      })

    }
    else {
      this._alertEndParking()
    }
  }

  _updateClock = () => {
    const currentDuration = this.state.elapsedDuration
    const currentMinutes = currentDuration % 60
    const currentHours = Math.floor(currentDuration / 60)
    let elapsedHourString, elapsedMinString

    if (currentMinutes > 9) {
      elapsedMinString = currentMinutes.toString()
    }
    else {
      elapsedMinString = "0" + currentMinutes.toString()
    }

    if (currentHours > 9) {
      elapsedHourString = currentHours.toString()
    }
    else {
      elapsedHourString = "0" + currentHours.toString()
    }

    this.setState({
      elapsedDuration: currentDuration+1,
      elapsedHour: elapsedHourString,
      elapsedMin: elapsedMinString,
    })
  }

  componentWillUnmount(){
    this._removeTimer()
  }

  _removeTimer(){
    if(this.intervalID) {
      clearInterval(this.intervalID)
      this.intervalID = null
    }
  }

  _elapsedParkingDurationTimer(){
    if (!this.intervalID){
      this.intervalID = setInterval(this._updateClock, 60000)
    }
  }

  _endParkingSession(){
    this._removeTimer()
    this.setState({
      isParkingInProgress:false,
      isBottomDrawerOpen:false,
      headerText: "STREETSMART",
      footerText:"PARK HERE",
      elapsedDuration:0,
      elapsedHour: "00",
      elapsedMin: "00",
    })
    //push parking history screen
  }

  _closeBottomDrawer(){
    console.log("close drawer fired")
    this.setState({
      isBottomDrawerOpen:false,
      headerText:"STREETSMART",
      footerText:"PARK HERE",
    })
  }

  render() {

    if (!this.state.isBottomDrawerOpen) {
      //render a small bar below the map with the road name
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
    else if (!this.state.isParkingInProgress ){
      //render the bottom drawer with to choose parking duration
      var bottomDrawerView = (
        <View style={{flex:7, flexDirection:"column", alignItems:"stretch", paddingLeft:20, borderWidth: 1, borderColor: "gainsboro",}}>
          <TouchableOpacity onPress={(event) => this.onClick} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Vehicle No.
            </Text>
            <View style={{flexDirection:"row", marginRight:10, flex:2}}>
              <Text style={[styles.labelsText, {color:"darkgrey", flex:2}]}>
                {this.props.navigator.props.vehicleData.vehicleNo}
              </Text>
              <Entypo name="chevron-thin-right" style={styles.chevronRight}></Entypo>
            </View>
          </TouchableOpacity>
          <View style={[styles.sideTabs, (Platform.OS === "ios") ? {height:200}:{}]}>
            <Text style={[styles.labelsText, {flex:2}]}>
              Estimated Parking Duration
            </Text>
            <Picker
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.estParkingDuration}
            onValueChange={(estParkingDuration) => this.setState({estParkingDuration})}>
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
    else {
      var bottomDrawerView = (
        <View style={{flex:7, flexDirection:"column", justifyContent:"flex-start", alignItems:"center", paddingLeft:20, borderWidth: 1, borderColor: "gainsboro",}}>
          <Text style={[styles.labelsText, {margin:5}]}>
            Duration and cost
          </Text>
          <View style={styles.circleView}>
            <View style={{top:height*0.05, flexDirection:"row"}}>
              <Text style={styles.clockText}>
                {this.state.elapsedHour}
              </Text>
              <Animatable.Text animation="flipInX" iterationCount="infinite" duration={1000} style={styles.clockText}>
                :
              </Animatable.Text>
              <Text style={styles.clockText}>
                {this.state.elapsedMin}
              </Text>
            </View>
            <View style={{top:height*0.05, flexDirection:"row"}}>
              <Text style={styles.clockLabels}>
                {"HOUR        "}
              </Text>
              <Text style={styles.clockLabels}>
                {"    MIN"}
              </Text>
            </View>
            <View>
            <Text style={[styles.clockLabels, {marginTop:height*0.07}]}>
              {this.state.cost}
            </Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <SideDrawer navigator={this.props.navigator} ref="SIDE_DRAWER">
        <ViewContainer style={{backgroundColor:"ghostwhite"}}>

          <HeaderBarWithMenuIcon onPressMenu={this._openSideDrawer} nav={this.props.navigator} isParkingInProgress={this.state.isParkingInProgress}>
            {this.state.headerText}
          </HeaderBarWithMenuIcon>

          <View style={{flex:9, justifyContent:"flex-start"}}>
            <MapViewContainer
            style={{flex:6}}
            userLocation={this.props.navigator.props.userLocation}
            handler={this._updateSelectedRoad}
            isBottomDrawerOpen={this.state.isBottomDrawerOpen}
            closeBottomDrawer={this._closeBottomDrawer}
            isParkingInProgress={this.state.isParkingInProgress}>
            </MapViewContainer>
            {bottomDrawerView}
          </View>

          <TouchableOpacity onPress={this._bottomButtonHandler} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
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
  },
  spinningIcon: {
    color: "mediumaquamarine",
    margin: 5,
    fontSize: 256,
  },
  circleView: {
    marginTop:10,
    height:height * 0.32,
    width:height * 0.32,
    borderRadius: height * 0.32 * 0.5,
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    borderWidth:4,
    borderColor:"steelblue",
  },
  clockText: {
    color: "steelblue",
    fontSize: height*0.078,
    textAlign: "center",
    margin: 3,
  },
  clockLabels: {
    color: "steelblue",
    fontSize: height*0.025,
  }
})

module.exports = MapNaviScreen
