import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Places from './../container/placeList';
import { BackHandler } from 'react-native';
import {
  Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
  Text, List, ListItem, Left, Body, Thumbnail, Right, Card, CardItem, View, Tab, Tabs, TabHeading,
} from 'native-base';
import MapView from 'react-native-maps';
import axios from 'axios';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import Polyline from '@mapbox/polyline';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
export default class Details extends Component {
  constructor() {
    super();
    this.state = {
      Data: {},
      cords: [],
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialMarker: {
        latitude: 37.78825,
        longitude: -122.4324
      }
    }
  }
  // async getDirections(init, des) {
  //   try {
  //     let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${init}&destination=${des}`)
  //     let respJson = await resp.json();
  //     let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //     let coords = points.map((point, index) => {
  //       return {
  //         latitude: point[0],
  //         longitude: point[1]
  //       }
  //     })
  //     this.setState({ coords: coords })
  //     return coords
  //   } catch (error) {
  //     alert(error)
  //     return error
  //   }
  // }
  componentDidMount() {
    // console.log(this.props.data);
    this.setState({ Data: this.props.data });
    var initialRegion = {
      latitude: this.props.data.geometry.location.lat,
      longitude: this.props.data.geometry.location.lng,
      latitudeDelta: LATTITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    }
    var initialMarker = {
      latitude: this.props.data.geometry.location.lat,
      longitude: this.props.data.geometry.location.lng
    }
    this.setState({ initialPosition: initialRegion });
    this.setState({ initialMarker: initialMarker });
    ///////////////////////////////////////////////////////////
    // var previousPosition = {};
    // AsyncStorage.getItem('initialPosition', (err, result) => {
    //   previousPosition = JSON.parse(result);
    // });
    // alert(JSON.stringify(previousPosition))
    // var init = `${previousPosition.latitude},${previousPosition.longitude}`;
    // var des = `${initialRegion.latitude},${initialRegion.longitude}`;
    // this.getDirections(init, des);
  }

  render() {
    console.log(this.state)
    var newData = this.state.Data
    var icon = newData.icon;
    var name = newData.name;
    var rating = newData.rating;
    var address = newData.formatted_address;
    var phoneNo = newData.formatted_phone_number;
    var iphoneNo = newData.international_phone_number;
    return (
      <Container style={{}}>

        <Tabs>
          <Tab heading={<TabHeading style={{ backgroundColor: '#237ece' }}><Icon name="keypad" /></TabHeading>}>
            <Content style={{ backgroundColor: '#dddbdb' }}>
              <Card>
                <CardItem header style={{ justifyContent: 'center' }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: `${icon}` }} />
                </CardItem>
                <CardItem>
                  <Body>
                  <List>
                    <ListItem itemDivider>
                      <Text>Name: {name}</Text>
                    </ListItem>
                    <ListItem >
                      <Text></Text>
                    </ListItem>
                    <ListItem itemDivider>
                      <Text> Rating: {rating}</Text>
                    </ListItem>
                    <ListItem>
                      <Text></Text>
                    </ListItem>
                    <ListItem itemDivider>
                      <Text>Address: {address}</Text>
                    </ListItem>
                    <ListItem>
                      <Text></Text>
                    </ListItem>
                    <ListItem itemDivider>
                      <Text> Phone No: {phoneNo}</Text>
                    </ListItem>
                    <ListItem>
                      <Text></Text>
                    </ListItem>
                    <ListItem itemDivider>
                      <Text> International Phone No: {iphoneNo}</Text>
                    </ListItem>
                    <ListItem>
                      <Text></Text>
                    </ListItem>
                  </List>
                  </Body>
                </CardItem>
                <CardItem footer style={{ justifyContent: 'center' }}>
                  <Text>Tourist Guide</Text>
                </CardItem>
              </Card>
            </Content>
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#237ece' }}><Text>Map</Text></TabHeading>}>
            <View style={styles.container}>
              <MapView style={styles.map}
                region={this.state.initialPosition} >
                <MapView.Marker draggable
                  coordinate={this.state.initialMarker}
                  onDragEnd={(e) => this.setState({ initialMarker: e.nativeEvent.coordinate })}
                  />
              </MapView>
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
// <MapView.Polyline
//   key="LTrainPolyline"
//   strokeWidth={5}
//   geodesic={true}
//   coordinates={this.state.coords}
//   strokeColor="rgba(0,0,200,0.5)"
//   lineDashPattern={[47.12]}
//   />
const styles = StyleSheet.create({
  container: {
    // flex: 3, 
    // flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F5FCFF',
    // position: 'absolute',
    // padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    // padding: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});