import { AppRegistry } from 'react-native';
import * as firebase from 'firebase';
import App from './App';   
  var config = {
    apiKey: "AIzaSyCWp6noMIdRjFyfU-MXQu_uWHVeBEVi-DI",
    authDomain: "family-gps-tracker-222f8.firebaseapp.com",
    databaseURL: "https://family-gps-tracker-222f8.firebaseio.com",
    projectId: "family-gps-tracker-222f8",
    storageBucket: "family-gps-tracker-222f8.appspot.com",
    messagingSenderId: "591510073760"
  };
  firebase.initializeApp(config);

AppRegistry.registerComponent('Hackathon', () => App);
