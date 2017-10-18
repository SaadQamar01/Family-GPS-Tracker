import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Details from './../components/Details.js';
import Dashboard from './Dashboard.js';
import { BackHandler } from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions, Picker,
  BackAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  Container, Header, Title, Content, Footer, FooterTab, Button, Icon,
  Text, List, ListItem, Left, Body, Thumbnail, Image, Right
} from 'native-base';
import axios from 'axios';
export default class Places extends Component {
  constructor() {
    super();
    this.state = {
      Data: []
    }
  }
  placeDetail(placeId) {
    console.log(placeId)
    let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`
    axios.get(url).then(({data}) => { Actions.Details({ data: data.result }) })
      .catch((error) => {
        if (error.response) {
          // Alert.alert(error.response.data);
        }
        // Alert.alert('No Internet Access')
        ToastAndroid.show('No Internet Access', ToastAndroid.SHORT);
      })
  }
  componentDidMount() {
    // var allData = [];
    console.log(this.props.data)
    this.setState({ Data: this.props.data })

    // this.setState({Data: this.props.data})
  }
  render() {
    return (
      //      <Header>
      //   <Left>
      //     <Button transparent onPress={() => Actions.Dashboard()}>
      //       <Icon name='arrow-back' />
      //     </Button>
      //   </Left>
      //   <Body>
      //     <Title style={{textAlign:'center'}}>{this.state.Data[0].types[0]} List</Title>
      //   </Body>
      // </Header>
      <Container>
        <Content>
          <List avatar
            dataArray={this.state.Data}
            renderRow={(d) =>
              <ListItem button onPress={() => this.placeDetail(d.place_id)}>
                <Thumbnail square size={0} source={{ uri: d.icon }} />
                <Body>
                  <Text>{d.name}</Text>
                  <Text note>Rating: {d.rating}</Text>
                </Body>
              </ListItem>
            }>
          </List>
        </Content>
        <Footer style={{ backgroundColor: '#237ece', color: "#fff" }}>

        </Footer>
      </Container>
    );
  }
}