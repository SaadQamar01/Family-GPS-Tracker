import React, { Component } from 'react';
import CreateGroup from './createGroup.js';
import Map from './Map.js';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Members from './members.js';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import MiddlewareRequests from './../store/middleWares/middlewareRequests.js';
import { Container, Header, Content, Card, CardItem, Footer, FooterTab, Thumbnail, Title, Right, Icon, Body, Left, List, ListItem } from 'native-base';
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
function mapStateToProps(state) {
    return {
       requestsData : state.reducerRequests,
    };
}
class Requests extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        store.dispatch(MiddlewareRequests.asyncRequests());
        // console.log("WillMount", this.props);
    }
    componentWillReceiveProps(props) {
        // console.log(props.requestsData);
        this.setState({
            data: props.requestsData,
        })
    }
    accept = (data) => {
        console.log(data);
               navigator.geolocation.getCurrentPosition((position) => {
            console.log("position ",position)
            let lat = parseFloat(position.coords.latitude)
            let long = parseFloat(position.coords.longitude)
            console.log(lat,long);
        firebase.database().ref('joinGroups/'+firebase.auth().currentUser.uid+"/"+data.groupKey).set({
            latitude:lat,
            longitude:long,
            name:firebase.auth().currentUser.displayName,
            gName:data.groupName,
            adminName:data.admin,
            id:data.groupId
        });
        }, (error) => Alert.alert('No Internet Access'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
            /////////////////////
         firebase.database().ref('groups/'+data.groupKey+"/"+"members").push({
            member:firebase.auth().currentUser.uid
        });
        //////////////////
        firebase.database().ref('users/'+firebase.auth().currentUser.uid+"/requests/"+data.groupKey).remove();   
    }
    cancel = (data) => {
        console.log(data.groupKey)
         firebase.database().ref('users/'+firebase.auth().currentUser.uid+"/requests/"+data.groupKey).remove();
    }
    render() {
        console.log(this.state.data)
        // console.log(this.state.key)
        return (
             <View style={styles.container}>
                {this.state.data ?
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.data.map((val, key) => (
                            <View style={styles.list}>
                                <TouchableOpacity>
                                    <Text style={styles.friendList}>{val.groupName}</Text>
                                </TouchableOpacity>
                                <View style={styles.inviteList1}>
                                    <TouchableOpacity  onPress={() => this.accept(val)}>
                                        <Text style={styles.inviteListText}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inviteList2}>
                                    <TouchableOpacity  onPress={() => this.cancel(val)}>
                                        <Text style={styles.inviteListText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    : <View><Text>Empty</Text></View>}
                <View style={styles.footer}>
                    <Text style={styles.textInput}></Text>
                </View>
            </View>
        )
    }
}
export default connect(mapStateToProps)(Requests)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    header: {
        backgroundColor: '#38b759',
        height: 60,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderBottomWidth: 10,
        // borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    friendList: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#38b759'
    },
    inviteList1: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#38b759',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 90,
        // left:5
    },
    inviteList2: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#38b759',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    inviteListText: {
        color: 'white'
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#38b759',
        borderTopWidth: 5,
        borderTopColor: '#ededed',
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0
    },
});

            // <Container>
            //     <Content>
            //         <Text>Requests list</Text>
            //         {this.state.data ?
            //             <List avatar
            //                 dataArray={this.state.data}
            //                 renderRow={(d) =>
            //                     <ListItem button onPress={() => this.list(d)}>
            //                         <Body>
            //                             <Text>{d.groupName}</Text>
            //                         </Body>
            //                     </ListItem>
            //                 }>
            //             </List>
            //             :
            //             <View> <Text>Empty</Text></View>
            //         }
            //         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            //             <TouchableOpacity onPress={() => this.accept()} >
            //                 <Text>Accept</Text>
            //             </TouchableOpacity>
            //         </View>
            //     </Content>
            // </Container>