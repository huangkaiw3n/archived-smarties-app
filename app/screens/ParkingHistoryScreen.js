"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert , Platform} from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import ScrollableList from 'react-native-scrollable-list'

class ParkingHistoryScreen extends Component{
  constructor(props){
    super(props)
  }

  parkingInfo = ({dateTime, venue, duration, amount}) => {
    return (
      <View style={{borderBottomWidth:1, borderColor:"darkgrey", marginLeft: 20, paddingTop: 20, paddingBottom: 30}}>
        <Text style={styles.labelsText}>Parking Began:  {dateTime.toDateString()}, {dateTime.toLocaleTimeString()}</Text>
        <Text style={styles.labelsText}>Duration          :  {duration} minutes</Text>
        <Text style={styles.labelsText}>Location          :  {venue}</Text>
        <Text style={styles.labelsText}>Parking Cost   :  ${amount.toFixed(2)}</Text>
      </View>
    )
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          PARKING HISTORY
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:10, justifyContent:"flex-start"}}>
        <ScrollableList data={this.props.parkingHistoryData} renderRow={this.parkingInfo} />
        </View>

      </ViewContainer>

    )
  }
}

const styles = StyleSheet.create({

  check: {
    alignSelf: "center",
    fontSize: 30,
    color: "limegreen",
  },
  headingsText: {
    marginLeft: 15,
    marginTop: 40,
    fontSize: 15,
    textAlign: "left",
    color: "darkgrey",
  },
  labelsText: {
    fontSize: 15,
    textAlign: "left",
    color: "black",
  },
})

module.exports = ParkingHistoryScreen
