// import React, { Component } from "react";
// // import { Image } from 'react-native';
// import { Container, Header, View, Button, Content, ActionSheet, Text, Footer, Badge, Icon, Card, CardItem, Body, Right, DeckSwiper, Thumbnail } from "native-base";
// import {
//   AppRegistry,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   TabIcon
// } from 'react-native';
// // import { connect } from 'react-redux';
// import store from './../store/index.js';
// import SignUp from './SignUp.js'
// import Login from './Login.js';
// import Places from './placeList.js';
// import Details from './../components/Details.js';
// import Map from './../components/Map.js';
// import Dashboard from './Dashboard.js'
// import MiddlewareSignup from './../store/middleWares/middlewareSignup.js';
// import { Router, Scene } from 'react-native-router-flux';
// import { Provider } from 'react-redux';
// //   function mapStateToProps(state) {
// //     return {
// //         patientsData: state.patientsData,
// //     };
// // }
// // function mapDispatchToProps(dispatch){
// //   return {
// //         patientDetail: (data) => dispatch( PatientMiddleware.asyncAddPatient(data)),
// //         loadPatients:() => {
// //           dispatch( PatientMiddleware.asyncLoadPatient())  
// //         }
// //         ,
// //         deleteAllPatients: () => dispatch( PatientMiddleware.asyncDeleteAllPatient()),
// //         deletePatient: (index) => dispatch( PatientMiddleware.asyncDeletePatient(index)),
// //   }
// // }

// export default class App extends Component {

//   constructor() {
//     super()
//     this.state = {

//     }
//   }
//   render() {
//     //         store.subscribe(() =>
//     //   console.log(store.getState())
//     // )
//     return (
//       // <View><Text>hello</Text></View>
//       <Provider store={store}>
//         <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} 
//         barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
//           <Scene headerTintColor="#fff" key="root" leftButtonIconStyle = {{ tintColor:'#fff'}}>
//             <Scene key="Login"
//               // renderTitle={() => (
//               //   <View>
//               //     <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
//               //   </View>
//               // )}
//               // renderBackButton={() => (null)}
//               // navigationBarStyle={styles.header}
//               component={Login}
//               // title="Tourist Guide"
//               hideNavBar
//               initial
//               />
//             <Scene
//               key="SignUp"
//               // renderTitle={() => (
//               //   <View>
//               //     <Image style={styles.headerLogo} source={require('../Images/bar.png')} />
//               //   </View>
//               // )}
//               hideNavBar
//               // renderBackButton={()=>(null)}
//               component={SignUp}
              
//               // initial
//               />
//             <Scene
//               key="Dashboard"
//               component={Dashboard}
//               // title="Tourist Guide"
//               hideNavBar
//               // initial
//               />
//             <Scene
//               key="Places"
//               component={Places}
//               title="List"
//               // hideNavBar
//               // initial
//               />
//             <Scene
//               key="Details"
//               component={Details}
//               title="Details"
//               // hideNavBar
//               // initial
//               />
//             <Scene
//             headerTintColor="#fff"
//               key="Map"
//               component={Map}
//               title="Map"
//               // navigationBarStyle={{backgroundColor: 'blue'}}
//               // name="tab"
//               //  type="switch"
//               //  icon={TabIcon}
//               // renderTitle={() => (
//               //   <View style={{backgroundColor:'blue',textAlign:'center'}}>
//               //     <Text style={{}}>Map</Text>
//               //   </View>
//               // )}
//               // header={<Text>Map</Text>}
//               // hideNavBar
//               // initial
//               />
//           </Scene>
//         </Router>
//       </Provider>
//     );
//   }
// }

// const styles = {
//   navBar: {
//     backgroundColor:'#237ece',
//     color:'#fff',
//     tintColor:'rgb(255,255,255)',
//     // textAlign:'center',
//         justifyContent: 'center',
//         // alignItems: 'center',
// },
// navBarTitle:{
//     color:'#FFFFFF',
//     //  paddingLeft: '30%',
//      fontWeight: 'bold',
//     // textAlign:'center',
//         // justifyContent: 'center',
//         // alignItems: 'center',
// },
// barButtonTextStyle:{
//     color:'#FFFFFF',
//     // textAlign:'center',
//         // justifyContent: 'center',
//         // alignItems: 'center',
// },
// barButtonIconStyle:{
//     tintColor:'rgb(255,255,255)',
//     // color:'rgb(255,255,255)',
// },
//   // header: {
//   //   backgroundColor: 'lightgrey',
//   //   padding: 25,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   flexDirection: 'row',
//   //   height: 64,
//   // },
//   headerLogo: {
//     // height: 50,
//     // width: 900,
//     flex: 1,
//     width: 360,
//     height: 100,
//     resizeMode: 'stretch'
//   },
// };
// // export default connect(mapStateToProps,mapDispatchToProps)(App)


