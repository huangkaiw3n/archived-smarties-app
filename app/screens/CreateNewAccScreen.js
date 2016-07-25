'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import HeaderBarWithLeftTouchableIcon from '../components/HeaderBarWithLeftTouchableIcon'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';

class CreateNewAccScreen extends Component{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <ViewContainer style={{justifyContent: "flex-start", backgroundColor:"aliceblue"}}>

        <HeaderBarWithLeftTouchableIcon nav={this.props.navigator}>
          CREATE A NEW ACCOUNT
        </HeaderBarWithLeftTouchableIcon>

        <View style={{flex:9, justifyContent:"flex-start", }}>
          <Fumi
            label={'Name'}
            iconClass={MaterialsIcon}
            iconName={'account-circle'}
            iconColor={'#f95a25'}
            keyboardType={'email-address'}
          />
          <Fumi
            style={{ marginTop: 3 }}
            label={'Email'}
            iconClass={MaterialsIcon}
            iconName={'email'}
            iconColor={'#f95a25'}
            keyboardType={'email-address'}
          />
          <Fumi
            style={{ marginTop: 3}}
            label={'Password'}
            iconClass={MaterialsIcon}
            iconName={'lock'}
            iconColor={'#f95a25'}
            secureTextEntry={true}
            keyboardType={'default'}
          />
          <Fumi
            style={{ marginTop: 3 }}
            label={'Mobile No.'}
            iconClass={MaterialsIcon}
            iconName={'smartphone'}
            iconColor={'#f95a25'}
            keyboardType={'numeric'}
          />
          <Text style={styles.genericText}>
            By creating an account, I agree to Streetsmart's
          </Text>
          <TouchableOpacity>
            <Text style={styles.genericTextLink}>
              Terms of Use and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.onClick} style={[styles.headerFooterBar, {justifyContent:"center"}]}>
          <Text style={styles.barText}>
            LET'S GET STARTED
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
  chevronLeft: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
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

module.exports = CreateNewAccScreen
