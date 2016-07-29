"use strict"
import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import ViewContainer from "../components/ViewContainer"
import HeaderBarWithLeftTouchableIcon from "../components/HeaderBarWithLeftTouchableIcon"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Modal from 'react-native-simple-modal';

class AccountSetupVehicleScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      vehicleNo: "",
      isCarSelected:true,
      isBikeSelected:false,
      open: false,
    }
  }

  _navigateToAccountSetupPaymentScreen(){
    // resetTo(route) clears the existing route stack unlike push(route)
    this.props.navigator.push({
      identifier:"AccountSetupPaymentScreen",
      vehicleData:this.state,
    })
  }

  _toggleSelectedVehicle() {
    this.setState({
      isCarSelected: !this.state.isCarSelected,
      isBikeSelected: !this.state.isBikeSelected,
    })
  }

  _motorCarPressed(){
    if (!this.state.isCarSelected){
      this._toggleSelectedVehicle()
    }
  }

  _motorBikePressed(){
    if (!this.state.isBikeSelected){
      this._toggleSelectedVehicle()
    }
  }


  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"ghostwhite"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          ACCOUNT SET UP
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9, justifyContent:"flex-start", }}>
          <View style={{marginTop:20, justifyContent:"center", alignItems:"center", flexDirection:"row", backgroundColor:"ghostwhite"}}>
            <View style={[styles.circleBorder, {backgroundColor: "steelblue"}]}>
              <Ionicons name="md-car" style={styles.selectedIcon}></Ionicons>
            </View>
              <Ionicons name="md-arrow-dropright" style={[styles.selectedIcon, {color:"darkgrey", fontSize:50, marginLeft: 30, marginRight: 30}]}></Ionicons>
            <View style={[styles.circleBorder, {backgroundColor: "darkgrey"}]}>
              <Ionicons name="logo-usd" style={styles.selectedIcon}></Ionicons>
            </View>
          </View>
          <Text style={styles.headingsText}>
            VEHICLE NO.
          </Text>

          <TouchableOpacity onPress={() => this.setState({open: true})} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Vehicle No.
            </Text>
            <Text style={[styles.labelsText, {color:"darkgrey"}]}>

            </Text>
          </TouchableOpacity>
          <Text style={styles.headingsText}>
            VEHICLE TYPE
          </Text>

          <TouchableOpacity onPress={()=>this._motorCarPressed()} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Motor Car
            </Text>
            <EvilIcons
            name="check"
            style={[styles.check, this.state.isCarSelected ? {opacity:1} : {opacity:0}]}>
            </EvilIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this._motorBikePressed()} style={styles.sideTabs}>
            <Text style={[styles.labelsText, {flex:4}]}>
              Motor Bike
            </Text>
            <EvilIcons
            name="check"
            style={[styles.check, this.state.isBikeSelected ? {opacity:1} : {opacity:0}]}>
            </EvilIcons>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={(event) => this._navigateToAccountSetupPaymentScreen()} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            ADD VEHICLE
          </Text>
        </TouchableOpacity>

        <Modal
        offset={this.state.offset}
        open={this.state.open}
        overlayBackground="rgba(0, 0, 0, 0.5)"
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        style={{alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
            <TouchableOpacity
               style={{margin: 5}}
               onPress={() => this.setState({offset: -100})}>
               <Text>Move modal up</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={{margin: 5}}
               onPress={() => this.setState({offset: 0})}>
               <Text>Reset modal position</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={{margin: 5}}
               onPress={() => this.setState({open: false})}>
               <Text>Close modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    marginTop: 20,
    flexDirection: "row",
  },
  barText: {
    color: "white",
    fontSize: 17,
    fontWeight: "200",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  check: {
    alignSelf: "center",
    fontSize: 30,
    color: "limegreen",
  },
  sideDrawerView: {
    flex: 1,
    backgroundColor: "ghostwhite",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  headingsText: {
    marginLeft: 15,
    marginTop: 40,
    fontSize: 13,
    textAlign: "left",
    color: "darkgrey",
  },
  labelsText: {
    fontSize: 13,
    textAlign: "left",
    color: "black",
  },
  sideTabs: {
    height: 45,
    borderWidth: 1,
    borderColor: "whitesmoke",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  selectedIcon: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
  },
  circleBorder: {
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})

module.exports = AccountSetupVehicleScreen
