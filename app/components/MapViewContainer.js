import React, { Component } from "react"
import { View, StyleSheet, Text , Platform} from "react-native"
import MapView from "react-native-maps";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";

class MapViewContainer extends Component{

  constructor(props){
    super(props)
    this.state = {
      pinCoordinate: {
        latitude: this.props.userLocation.latitude,
        longitude: this.props.userLocation.longitude,
      }
    }
  }

  _handleSelectedLoc(e){
    this.setState({ pinCoordinate: e.nativeEvent.coordinate })
    this.getStreetNameFromApi()
    // this.props.handler(`Lat:${this.state.pinCoordinate.latitude} , Lon:${this.state.pinCoordinate.longitude}`)
  }

  async getStreetNameFromApi() {
    try {
      let address = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
      let latlng = this.state.pinCoordinate.latitude.toString() + "," + this.state.pinCoordinate.longitude.toString()
      let restrict = "&result_type=street_address"
      let apiKey = "&key=AIzaSyDO62FsyZlVzkcrtk1R0DKu9wXwMWlqK90"
      console.log(address+latlng+restrict+apiKey)
      let response = await fetch(address+latlng+restrict+apiKey)
      let responseJson = await response.json()
      this.props.handler(responseJson.results[0].formatted_address + responseJson.status)
    } catch(error) {
      this.props.handler(error)
    }
  }

  render() {
    return (
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: this.state.pinCoordinate.latitude,
        longitude: this.state.pinCoordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={true}
      loadingEnabled={true}
      loadingBackgroundColor="gainsboro"
      >
        <MapView.Marker draggable
        coordinate={this.state.pinCoordinate}
        pinColor = {"steelblue"}
        onDragEnd={(event) => this._handleSelectedLoc(event)}>
        {/*Custom marker doesnt seem to align with actual marker position. Makes it hard to select for dragging.*/}
          {/*<MaterialsIcon name="person-pin-circle" size={60} color="steelblue" />*/}
          {(Platform.OS === "android") ? <MaterialsIcon name="person-pin-circle" size={60} color="steelblue" />: null}
        </MapView.Marker>
      </MapView>
    )
  }
}

const styles = StyleSheet.create({

  // container: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: 400,
  //   width: 400,
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

module.exports = MapViewContainer
