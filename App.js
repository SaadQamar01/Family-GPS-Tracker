import React, { Component } from 'react';
import CreateGroup from './src/components/createGroup.js'
import { Container, Header,View, Button, Content, ActionSheet, 
  Footer, Badge,  Icon,Card, CardItem,Body,Right,DeckSwiper,Thumbnail } from "native-base";
import store from './src/store/index.js';
import SignUp from './src/container/SignUp.js'
import Login from './src/container/Login.js';
import Groups from './src/components/groups.js';
import Members from './src/components/members.js';
import InviteFriends from './src/components/inviteFriends.js';
import Requests from './src/components/requests.js';
import Map from './src/components/Map.js';
import Dashboard from './src/container/Dashboard.js'
// import MiddlewareSignup from './src/store/middleWares/middlewareSignup.js';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  TabIcon
} from 'react-native';
export default class App extends Component<{}> {
  render() {
    return (
      // <View>
      // <Text>Saad</Text>
      // </View>
 <Provider store={store}>
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} 
        barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
          <Scene headerTintColor="#fff" key="root" leftButtonIconStyle = {{ tintColor:'#fff'}}>
            <Scene key="Login"
              component={Login}
              // title="Tourist Guide"
              hideNavBar
              initial
              />
            <Scene
              key="SignUp"
              hideNavBar
              component={SignUp}
              // initial
              />
            <Scene
              key="Dashboard"
              component={Dashboard}
              // title="Tourist Guide"
              hideNavBar
              // initial
              />
            <Scene
            headerTintColor="#fff"
              key="Map"
              component={Map}
              title="Map"
              // initial
              />
            <Scene
            headerTintColor="#fff"
              key="Groups"
              component={Groups}
              title="Groups"
              />
            <Scene
            headerTintColor="#fff"
              key="CreateGroup"
              component={CreateGroup}
              title="CreateGroup"
              />
            <Scene
            headerTintColor="#fff"
              key="Members"
              component={Members}
              title="Members"
              />
            <Scene
            headerTintColor="#fff"
              key="InviteFriends"
              component={InviteFriends}
              title="Invite Friends"
              />
            <Scene
            headerTintColor="#fff"
              key="Requests"
              component={Requests}
              title="Requests"
              />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = {
  navBar: {
    backgroundColor:'#38b759',
    color:'#fff',
    tintColor:'rgb(255,255,255)',
    // textAlign:'center',
        justifyContent: 'center',
        // alignItems: 'center',
},
navBarTitle:{
    color:'#FFFFFF',
    //  paddingLeft: '30%',
     fontWeight: 'bold',
    // textAlign:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
},
barButtonTextStyle:{
    color:'#FFFFFF',
    // textAlign:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
},
barButtonIconStyle:{
    tintColor:'rgb(255,255,255)',
    // color:'rgb(255,255,255)',
},
  // header: {
  //   backgroundColor: 'lightgrey',
  //   padding: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   height: 64,
  // },
  headerLogo: {
    // height: 50,
    // width: 900,
    flex: 1,
    width: 360,
    height: 100,
    resizeMode: 'stretch'
  },
};
