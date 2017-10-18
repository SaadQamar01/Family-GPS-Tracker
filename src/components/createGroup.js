import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import Groups from './groups.js';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions, Picker,
  BackAndroid,
  ToastAndroid,
  Alert
} from 'react-native';
export default class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      gName: '',
      ID: '',
    }
  }
  submit = () => {
    var Name = this.state.gName;
    var ID = this.state.ID;
    var rootRef = firebase.database().ref();
    var user = firebase.auth().currentUser;
    console.log(user.displayName);
    const speedRef = rootRef.child("groups").push({
      adminId: firebase.auth().currentUser.uid,
      adminName:user.displayName,
      gName: Name,
      id: ID,
    })
    speedRef.child('members').push({
      member: firebase.auth().currentUser.uid,
    })
    console.log("check ", speedRef)
    alert('circle created')
    // Actions.Groups();
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <Content style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label>Group Name:</Label>
                <Input onChangeText={(gName) => this.setState({ gName })} />
              </Item>
              <Item floatingLabel>
                <Label>Group Id:</Label>
                <Input onChangeText={(ID) => this.setState({ ID })} />
              </Item>
              <Button active info full onPress={this.submit} style={styles.submit}>
                <Text style={{ fontWeight: 'normal', color: 'white' }} uppercase={false}>Submit</Text>
              </Button>
            </Form>
          </Content>
        </ScrollView>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {

    // width:300,
    // height:200,
    // position: 'relative',
    top: '-5%',
    //  paddingLeft: '10%',
    //  paddingRight: '10%',
    marginLeft: '7%',
    marginTop: '10%',
    marginRight: '7%',
    // marginBottom:'40%',
    padding: '10%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    opacity: 0.9
  },
  headerLogo: {
    // height: 50,
    // width: 900,
    // flex: 1,
    width: '100%',
    height: 60,
    resizeMode: 'stretch',
    // opacity:1
  },
  submit: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:'#38b759'
  },
  back: {
    borderRadius: 10,
    // marginTop:10,
    // marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    // opacity:0.8
  }
});