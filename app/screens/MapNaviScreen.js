"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Picker, Platform, Dimensions, TextInput, Keyboard } from "react-native"
import MapViewContainer from "../components/MapViewContainer"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithMenuIcon from "../components/HeaderBarWithMenuIcon"
import SideDrawer from "../components/SideDrawer"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import * as Animatable from 'react-native-animatable'
import KeyboardSpacer from 'react-native-keyboard-spacer';

var AnimatedCircleIcon = Animatable.createAnimatableComponent(FontAwesome)
var {height, width} = Dimensions.get('window')
const dummyDataIOS = [
  {
    date: "Mon Aug 8 2016",
    time: "1:13:20 PM SGT",
    venue: "North Buona Vista Rd, Singapore",
    duration: 125,
    amount: 2.5,
  },
  {
    date: "Tue Aug 2 2016",
    time: "8:15:12 AM SGT",
    venue: "One-north Gateway, Singapore",
    duration: 78,
    amount: 1.5,
  },
]
const dummyDataAndroid = [
  {
    date: "Mon Aug 8 2016",
    time: "13:13:20",
    venue: "North Buona Vista Rd, Singapore",
    duration: 125,
    amount: 2.5,
  },
  {
    date: "Tue Aug 2 2016",
    time: "8:15:12",
    venue: "One-north Gateway, Singapore",
    duration: 78,
    amount: 1.5,
  },
]

class MapNaviScreen extends Component{
  constructor(props){
    super(props)
    this.intervalID = null
    this.startDateTime = null
    this.elapsedDuration = 0 //in minutes
    this.isParkingInProgress = false
    this.isBottomDrawerOpen = false
    this.parkingHistoryData = (Platform.OS === "ios") ? dummyDataIOS:dummyDataAndroid
    this.parkingCost = 0.5
    this._updateSelectedRoad = this._updateSelectedRoad.bind(this)
    this._openSideDrawer = this._openSideDrawer.bind(this)
    this._closeBottomDrawer = this._closeBottomDrawer.bind(this)
    this._alertSetUpRequired = this._alertSetUpRequired.bind(this)
    this._openParkingHistoryScreen = this._openParkingHistoryScreen.bind(this)
    this.state = {
      roadname: "",
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: this.props.navigator.props.isCarSelected,
      headerText: "STREETSMART",
      footerText: "PARK HERE",
      estParkingDuration: 1,
      elapsedHour: "00",
      elapsedMin: "00",
      cost: "$0.50",
    }
  }

  componentWillMount(){
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {

  }

  _keyboardDidHide = () => {
    console.log("HIDE!")
    this.props.navigator.props.updateVehicleData({
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: this.props.navigator.props.isCarSelected,
      isBikeSelected: this.props.navigator.props.isBikeSelected,
    })
    this.refs["VEH_TEXTINPUT"].blur()
  }

  // componentDidMount(){
  //   if (!this.props.navigator.props.vehicleData && this.props.navigator.props.userData){
  //     this._alertSetUp()
  //   }
  // }

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
      "Vehicle information required",
      "Please enter your vehicle information to begin parking.",
      [
        {text: "OK"},
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

  _alertConfirmParking(){
    Alert.alert(
      "Parking confirmation",
     "Are you sure you want to park here?",
      [
        {text: "Cancel"},
        {text: "Yes", onPress: () => {
          this._startParking()}
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

  _parkingStarted = () => {
    //CALL DB
    this.props.navigator.props.pushObjectToDb(this.props.navigator.props.vehicleNo, true)
    this.startDateTime = new Date()
    console.log(this.startDateTime)
    this._elapsedParkingDurationTimer()
    this._alertParkingStarted()
  }

  _bottomButtonHandler = () => {
    console.log("open drawer fired")
    // let toggleDrawerState = !this.state.isBottomDrawerOpen
    // if (!this.props.navigator.props.userData){
    //   this._alertNeedLogIn()
    // }
    if (!this.props.navigator.props.vehicleNo){
      this._alertSetUpRequired()
    }
    else if (!this.isParkingInProgress){
      this._alertConfirmParking()
    }
    else {
      this._alertEndParking()
    }
  }

  _startParking(){
    this.isParkingInProgress = true
    this.setState({
      headerText: "PARKING IN PROGRESS",
      footerText:"STOP PARKING",
    }, this._parkingStarted)
  }

  _updateClock = () => {
    this.elapsedDuration = this.elapsedDuration + 1
    const currentDuration = this.elapsedDuration
    const currentMinutes = currentDuration % 60
    const currentHours = Math.floor(currentDuration / 60)
    let elapsedHourString, elapsedMinString

    if (!(this.elapsedDuration % 30)){ //increase by 50c per 30 min
      this.parkingCost = this.parkingCost + 0.5
    }

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
      elapsedHour: elapsedHourString,
      elapsedMin: elapsedMinString,
      cost: "$" + this.parkingCost.toFixed(2),
    })
  }

  componentWillUnmount(){
    this._clearTimerAndStartDateTime()
  }

  _clearTimerAndStartDateTime(){
    if(this.intervalID) {
      clearInterval(this.intervalID)
      this.intervalID = null
    }
    if(this.startDateTime) {
      this.startDateTime = null
    }
  }

  _resetParkingInfo(){
    this.elapsedDuration = 0
    this.isParkingInProgress = false
    this.isBottomDrawerOpen = false
    this.parkingCost = 0.5
  }

  _elapsedParkingDurationTimer(){
    if (!this.intervalID){
      this.intervalID = setInterval(this._updateClock, 1000) //determines how long 1 minute is
    }
  }

  _saveAndPushParkingInfo(){
    const parkingInfo = {
      date: this.startDateTime.toDateString(),
      time: this.startDateTime.toLocaleTimeString(),
      venue: this.state.roadname,
      duration: this.elapsedDuration,
      amount: this.parkingCost,
    }
    this.parkingHistoryData.unshift(parkingInfo)
    console.log("ParkingInfo:" + parkingInfo)
    console.log("ParkingHistoryData:" + this.parkingHistoryData)
  }

  _endParkingSession(){
    this.props.navigator.props.pushObjectToDb(this.props.navigator.props.vehicleNo, false)
    this._saveAndPushParkingInfo()
    this._clearTimerAndStartDateTime()
    this._resetParkingInfo()
    this.setState({
      headerText: "STREETSMART",
      footerText:"PARK HERE",
      elapsedHour: "00",
      elapsedMin: "00",
    }, this._openParkingHistoryScreen)
  }

  _openParkingHistoryScreen = () => {
    this.props.navigator.push({
      identifier: "ParkingHistoryScreen",
      parkingHistoryData: this.parkingHistoryData,
    })
  }

  _closeBottomDrawer(){
    console.log("close drawer fired")
    this.isBottomDrawerOpen = false
    this.setState({
      headerText:"STREETSMART",
      footerText:"PARK HERE",
    })
  }

  _setEstParkingDuration = (estParkingDuration) => {
    this.setState({estParkingDuration})
  }

  _setVehicleType = (isCarSelected) => {
    console.log("fired", isCarSelected)
    this.setState({isCarSelected})
    this.props.navigator.props.updateVehicleData({
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: isCarSelected,
      isBikeSelected: !isCarSelected,
    })
  }

  _vehicleTextOnSubmit = () => {

    this.props.navigator.props.updateVehicleData({
      vehicleNo: this.props.navigator.props.vehicleNo,
      isCarSelected: this.props.navigator.props.isCarSelected,
      isBikeSelected: this.props.navigator.props.isBikeSelected,
    })
    this.refs["VEH_TEXTINPUT"].blur()
  }

  _setVehicleNo = (vehicleNo) => {
    this.props.navigator.props.updateVehicleData({
      vehicleNo: vehicleNo,
      isCarSelected: this.state.isCarSelected,
      isBikeSelected: !this.state.isCarSelected,
    })
  }

  render() {

    if (!this.isParkingInProgress ){
      //render the bottom drawer with to choose parking duration
      var bottomDrawerView = (
        <View style={{flex:7, flexDirection:"column", alignItems:"stretch", paddingLeft:20, borderWidth: 1, borderColor: "gainsboro",}}>
          <View style={[styles.sideTabs, {flex:1, flexDirection:"row", alignItems:"center"}]}>
            <View style={{flex:3}}>
              <Text style={{color:"grey", fontSize:16}}>Parking Lot</Text>
            </View>
            <View style={{flex:7}}>
              <Text style={{color:"black", fontSize:16, textAlign:"right"}}>{this.state.roadname}</Text>
            </View>
          </View>
          <View style={[styles.sideTabs, {flex:1}]}>
            <Text style={[styles.labelsText, {flex:4, color:"grey"}]}>
              Vehicle No.
            </Text>
            <View style={{flexDirection:"row", marginRight:10, flex:2}}>
              <TextInput
              ref="VEH_TEXTINPUT"
              style={[styles.labelsText, {flex:1, padding:0}]}
              underlineColorAndroid="transparent"
              onChangeText={this._setVehicleNo}
              autoCorrect={false}
              value={this.props.navigator.props.vehicleNo}
              blurOnSubmit={true}
              multiline={false}
              returnKeyType="done"
              onSubmitEditing={this._vehicleTextOnSubmit}
              onFocus={this._vehicleTextOnFocus}
              placeholder="Your Vehicle No."
              />
            </View>
          </View>
          <KeyboardSpacer/>
          <View style={[styles.sideTabs, (Platform.OS === "ios") ? {height:200}:{}, {flex:1}]}>
            <Text style={[styles.labelsText, {flex:13, color:"grey"}]}>
              Vehicle Type
            </Text>
            <Picker
            // mode="dropdown"
            style={[styles.pickerStyle, {flex:3}]}
            selectedValue={this.props.navigator.props.isCarSelected}
            onValueChange={this._setVehicleType}>
              <Picker.Item label="Motor Car" value={true} />
              <Picker.Item label="Motor Bike" value={false} />
            </Picker>
          </View>
          <View style={[styles.sideTabs, (Platform.OS === "ios") ? {height:200}:{}, {flex:1}]}>
            <Text style={[styles.labelsText, {flex:2, color:"grey"}]}>
              Est. Parking Duration
            </Text>
            <Picker
            // mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.estParkingDuration}
            onValueChange={this._setEstParkingDuration}>
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
              <Animatable.Text animation="flipInX" iterationCount="infinite" duration={1000} easing="linear" style={styles.clockText}>
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
      <SideDrawer navigator={this.props.navigator} ref="SIDE_DRAWER" alertSetUpRequired={this._alertSetUpRequired} openParkingHistoryScreen={this._openParkingHistoryScreen}>
        <ViewContainer style={{backgroundColor:"ghostwhite"}}>

          <HeaderBarWithMenuIcon onPressMenu={this._openSideDrawer} nav={this.props.navigator} isParkingInProgress={this.isParkingInProgress}>
            {this.state.headerText}
          </HeaderBarWithMenuIcon>

          <View style={{flex:9, justifyContent:"flex-start"}}>
            <MapViewContainer
            style={{flex:7}}
            userLocation={this.props.navigator.props.userLocation}
            handler={this._updateSelectedRoad}
            isBottomDrawerOpen={this.isBottomDrawerOpen}
            closeBottomDrawer={this._closeBottomDrawer}
            isParkingInProgress={this.isParkingInProgress}>
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
    paddingRight: 20,
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
