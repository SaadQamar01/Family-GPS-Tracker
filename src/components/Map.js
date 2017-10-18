import React, { Component } from 'react';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
    Text, List, ListItem, View, Left, Right, Body, Fab
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Dashboard from './../container/Dashboard.js';
import { BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Polyline from '@mapbox/polyline';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Picker,
    BackAndroid,
    ToastAndroid
} from 'react-native';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.098
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            membersLocation: [],
            initialPosition: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            initialMarker: {
                latitude: 0,
                longitude: 0
            },
        }
    }
    componentWillMount() {
          console.log(this.props.circleMap);
          var mydata=this.props.circleMap;
        //   console.log(mydata[0].latitude)
         var membersLocation=[];
          for(var i=0;i<mydata.length;i++){
         var membersPostion={
           latitude: mydata[i].latitude,
           longitude: mydata[i].longitude,
           name:mydata[i].name,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            }
            membersLocation.push(membersPostion);
          }
          console.log(membersLocation);
        this.setState({ membersLocation:membersLocation })
    }
    render() {
        console.log(this.state.membersLocation)
        return (
            <Container>
                <Content>
                    <View  >
                        <MapView
                            region={this.state.membersLocation[0]}
                            style={styles.map}
                            showsCompass={true}
                            loadingEnabled={true}
                            showsBuildings={true}
                            provider='google'>
                            {this.state.membersLocation.map(marker=>(
                            <MapView.Marker 
                                coordinate={marker}
                                title={marker.name}
                                />
                            ))}
                            
                        </MapView>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#38b759' }}
                            position="topRight"
                            onPress={() => {
                                this.setState({
                                    initialPosition: {
                                        latitude: this.state.initialPosition.latitude,
                                        longitude: this.state.initialPosition.longitude, 
                                        latitudeDelta: LATITUDE_DELTA, 
                                        longitudeDelta: LONGITUDE_DELTA
                                    }
                                })
                            } }
                            >
                            <Icon name="navigate" style={{}} />
                        </Fab>
                    </View>
                </Content>
                <Footer style={{ backgroundColor: '#38b759', color: "#fff" }}>

                </Footer>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 3, 
        // flexDirection: 'row',
        position: 'absolute',
        // padding: 20,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    map: {
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height
    }
});
