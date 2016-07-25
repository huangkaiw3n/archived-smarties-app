import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MapView from 'react-native-maps';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';


class MapViewContainer extends Component{

  constructor(props){
    super(props)
    this.state = {
      region: {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      pinCoordinate :{
        latitude: 1.3521,
        longitude: 103.8198,
      }
    }
  }

  _handleSelectedLoc(e){
    this.setState({ pinCoordinate: e.nativeEvent.coordinate })
    this.props.handler('RAR!')
  }

  render() {
    return (
      <MapView
      style={styles.map}
      region={this.state.region}
      >
        <MapView.Marker draggable
        coordinate={this.state.pinCoordinate}
        pinColor = {"steelblue"}
        onDragEnd={(event) => this._handleSelectedLoc(event)}
        >
        {/*Custom marker doesnt seem to align with actual marker position. Makes it hard to select for dragging.*/}
          {/*<MaterialsIcon name="person-pin-circle" size={60} color="steelblue" />*/}
        </MapView.Marker>
      </MapView>
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
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

module.exports = MapViewContainer
