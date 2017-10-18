import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import Groups from './../components/groups.js';
import InviteFriends from './../components/inviteFriends.js';
// import MiddlewareRequests from './../store/middleWares/middlewareRequests.js';
import MiddlewareRequests from './../store/middleWares/middlewareRequests.js';
import store from './../store/index.js';
import Requests from './../components/requests.js'
import {
    Container, Header, Title, Content, Footer, FooterTab, Icon,
    List, ListItem, Left, Right, Body, Fab, Tab, Tabs, TabHeading,Badge
} from 'native-base';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as firebase from 'firebase';
// import Map from './../components/Map.js';
// import MapView from 'react-native-maps';
import axios from 'axios';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {
    AsyncStorage,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button,
    Image,
    Dimensions, Picker,
    BackAndroid,
    ToastAndroid,
    Alert
} from 'react-native';
// import {
//     CardImage,
//     CardTitle,
//     CardContent,
//     CardAction
// } from 'react-native-card-view';
const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
const windowSize = require('Dimensions').get('window')
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
const LATITUDE_DELTA = 0.098
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
var name = "Searching.....";
var checkBackButton = true;
var lat;
var long;
// function mapStateToProps(state) {
//     return {
//         requestsData: state.reducerRequests,
//     };
// }
function mapStateToProps(state) {
    return {
       requestsData : state.reducerRequests,
    };
}
class Dashboard extends Component {
    constructor() {
        // alert('constructor');
        super();
        this.state = {
            data: [],
            requestsLength:0,
            coords: [],
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA,
            },
            DestinationRegion: {
                latitude: 0,
                longitude: 0,
            },
            initialMarker: {
                latitude: 0,
                longitude: 0
            }
        }

    }
    // getInitialState() {
    //     return {
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         },
    //     };
    // }

    //     // onRegionChange(region) {
    //     //     this.setState({ region });
    //     // }
    //     // watchID: ?number=null
    componentDidMount() {
        // alert('componentDidMount')
        store.dispatch(MiddlewareRequests.asyncRequests());

        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position)
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            }
            this.setState({ initialPosition: initialRegion })
            this.setState({ initialMarker: initialRegion })
            var rootRef = firebase.database().ref();
            const speedRef = rootRef.child("users" + "/" + firebase.auth().currentUser.uid).update({
                latitude: lat,
                longitude: long
            })
        }, (error) => Alert.alert('No Internet Access'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            }
            // alert('componentDidMount2')
            this.setState({ initialPosition: lastRegion })
            this.setState({ initialMarker: lastRegion })
            // console.log(`${lat}`, long)
        })
    }
        componentWillReceiveProps(props) {
        console.log(props);
        var rlength=props.requestsData.length
        this.setState({
            requestsLength:rlength,
        })
    }
    async getDirections(startLoc, destinationLoc) {
        //   this.setState({destinationRegion:destinationLoc})
        var init = `${startLoc.latitude},${startLoc.longitude}`;
        var des = `${destinationLoc.latitude},${destinationLoc.longitude}`;
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${init}&destination=${des}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            alert(error)
            return error
        }
    }
    logout() {
        firebase.auth().signOut()
        Actions.Login()
        // name = "Searching.....";
    }

    componentWillMount() {
        BackHandler.addEventListener('backPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backPress', false);
    }
    handleBackButton() {
        try {
            // alert(Actions.currentRouter.currentRoute);
            if (Actions.currentScene === 'Dashboard') {
                Actions.Dashboard();
                return true;
            }
            else if (Actions.currentScene === 'Login') {
                Actions.Login();
                return true;
            }
        } catch (err) {
            return false;
        }
    }
    //      myMap=()=>{
    //         if(this.state.initialPosition.latitude===0){
    //             Alert.alert('No Internet Access')
    //         }
    //         else{
    //             Actions.Map({ position: this.state.initialPosition })
    //         }
    // }
    groups = () => {
        Actions.Groups();
    }
    render() {
        // alert(name)
        // <Image style={styles.headerLogo} source={require('../Images/bar.png')}/>
        // <Icon name="menu" style={{ color: "#fff" }} />
        return (
            <Container>
                <Header style={{ backgroundColor: '#38b759', color: "#fff" }}>
                    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Title>Family Tracker</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Log out</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Content>
                    <Tabs initialPage={0} >
                        <Tab heading={<TabHeading style={{ backgroundColor: '#38b759', color: '#fff' }}><Text style={{ color: 'white' }}>Map</Text></TabHeading>}>
                            <GooglePlacesAutocomplete
                                placeholder='Enter Destination Place'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                listViewDisplayed='auto'    // true/false/undefined
                                fetchDetails={true}
                                renderDescription={(row) => row.description} // custom description render
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    var DestinationRegion = {
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng

                                    }
                                    this.setState({ DestinationRegion: DestinationRegion })
                                    this.getDirections(this.state.initialPosition, DestinationRegion)
                                    console.log(data);
                                    console.log(details);
                                } }
                                getDefaultValue={() => {
                                    return ''; // text input default value
                                } }
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI',
                                    language: 'en', // language of the results
                                    // types: '(cities)' // default: 'geocode'
                                }}
                                styles={{
                                    description: {
                                        fontWeight: 'bold',
                                        zIndex: 16
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    },
                                    listView: {
                                        color: 'black', //To see where exactly the list is
                                        zIndex: 16, //To popover the component outwards
                                        backgroundColor: 'white'
                                        //   position: 'absolute',  
                                    }
                                }}


                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    // types: 'food'
                                }}

                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                // predefinedPlaces={[homePlace, workPlace]}

                                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                                // renderRightButton={() => <Text>Custom text after the inputg</Text>}
                                />
                            <View style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                flex: 1
                            }}>
                                <MapView
                                    region={this.state.initialPosition}
                                    style={styles.map}
                                    showTraffic={true}
                                    showsUserLocation={true}
                                    showsCompass={true}
                                    loadingEnabled={true}
                                    showsBuildings={true}
                                    provider='google'>

                                    <MapView.Marker
                                        coordinate={this.state.initialPosition}
                                        title={"title"}
                                        >
                                    </MapView.Marker>
                                    <MapView.Polyline
                                        key="LTrainPolyline"
                                        strokeWidth={6}
                                        strokeColor="#6da0f2"
                                        lineCap='round'
                                        strokeWidth={5}
                                        geodesic={true}
                                        coordinates={this.state.coords}
                                        // strokeColor="rgba(0,0,200,0.5)"
                                        lineDashPattern={[47.12]}
                                        />
                                    <MapView.Marker draggable
                                        coordinate={this.state.DestinationRegion}
                                        title={"title"}
                                        onDragEnd={(e) => this.setState({ DestinationRegion: e.nativeEvent.coordinate })}
                                        />
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
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#38b759' }}><Text style={{ color: 'white' }}>Circle</Text></TabHeading>}>
                            <Groups />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={{ backgroundColor: '#38b759', color: 'white' }}>
                                <View active badge vertical>
                                    <Badge ><Text style={{ color: 'white' }}>{this.state.requestsLength}</Text></Badge>
                                    <Text style={{ color: 'white' }}>Request</Text>
                                </View>
                            </TabHeading>}>
                        <Requests />
                        </Tab>
                    </Tabs>
                </Content>
                <Footer style={{ backgroundColor: '#38b759', color: "#fff" }}>
                </Footer>
            </Container>
        )
    }
}
export default connect(mapStateToProps)(Dashboard)
// <TouchableOpacity onPress={() => this.myMap()}
//     style={styles.place_name}>
//     <Text>{name}</Text>
// </TouchableOpacity>


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
    },
});