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

  _handleSelectedLoc = (e) => {
    console.log("Moved Pin Coord: ")
    console.log(e.nativeEvent.coordinate)
    this.setState({ pinCoordinate: e.nativeEvent.coordinate })
    this.getStreetNameFromApi(e.nativeEvent.coordinate)
    this.props.closeBottomDrawer()
    // this.props.handler(`Lat:${this.state.pinCoordinate.latitude} , Lon:${this.state.pinCoordinate.longitude}`)
  }

  async getStreetNameFromApi(coordinate) {
    try {
      let address = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
      let latlng = coordinate.latitude.toString() + "," + coordinate.longitude.toString()
      let apiKey = "&key=AIzaSyDO62FsyZlVzkcrtk1R0DKu9wXwMWlqK90"
      console.log(address+latlng+apiKey)
      let response = await fetch(address+latlng+apiKey)
      let responseJson = await response.json()
      this.props.handler(responseJson.results[0].formatted_address)
    } catch(error) {
      this.props.handler(error)
    }
  }

  componentWillMount(){
    this.getStreetNameFromApi(this.state.pinCoordinate)
  }

  _onPressHandler = () => {
    if(this.props.isBottomDrawerOpen){
      this.props.closeBottomDrawer()
    }
  }

  render() {
    return (
      <View style={[styles.mapWrapperView, this.props.style || {}]}>
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.pinCoordinate.latitude,
          longitude: this.state.pinCoordinate.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        loadingBackgroundColor="gainsboro"
        onPress={this._onPressHandler}>
          <MapView.Marker draggable
          coordinate={this.state.pinCoordinate}
          pinColor = {"steelblue"}
          onDragEnd={this._handleSelectedLoc}>
          {/*Custom marker doesnt seem to align with actual marker position. Makes it hard to select for dragging.*/}
            {/*<MaterialsIcon name="person-pin-circle" size={60} color="steelblue" />*/}
            {(Platform.OS === "android") ? <MaterialsIcon name="person-pin-circle" size={60} color="steelblue" />: null}
          </MapView.Marker>
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapWrapperView: {
    flex: 1,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

module.exports = MapViewContainer
