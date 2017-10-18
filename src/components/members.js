import React, { Component } from 'react';
import CreateGroup from './createGroup.js';
import Map from './Map.js';
import store from './../store/index.js';
import InviteFriends from './inviteFriends.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MiddlewareMembers from './../store/middleWares/middlewareMembers.js';
import { Container, Header, Content, Card, CardItem, Footer, FooterTab, Spinner, Thumbnail, Title, Right, Icon, Body, Left, List, ListItem } from 'native-base';
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
        membersData: state.reducerMembers,
    };
}
class Members extends Component {
    constructor() {
        super();
        this.state = {
            adminName: '',
        }
    }
    componentWillMount() {
        store.dispatch(MiddlewareMembers.asyncMembers(this.props.data));
        // console.log("WillMount", this.props);
        this.setState({
            data: this.props.membersData,
        })
    }
    componentWillReceiveProps(props) {
        // alert("props recieved")
        // console.log(props.membersData);
        this.setState({
            data: props.membersData,
        })
    }
    // componentWillMount() {
    //     console.log("admin Name", this.props.data);
    // var Rootref = firebase.database().ref().child("groups/"+this.props.data.key+"/"+"members");
    // if(Rootref!=null){
    // Rootref.on("value", snap => {
    //     var data = snap.val();
    //     console.log("data",data);
    //     // console.log("uid",firebase.auth().currentUser.uid);
    //     let mData = [];
    //     for (let key in data) {
    //         data[key].key=key
    //         mData.push(data[key])
    //         // keys.push(key)
    //     }
    //     console.log(mData);
    //     var membersInfo=[];
    //     for(var i=0;i<mData.length;i++){
    //     var info = firebase.database().ref().child("users/"+mData[i].member);
    //     info.on("value", snap => {
    //     var userInfo = snap.val();
    //     membersInfo.push(userInfo)
    //     })
    //     }
    //     console.log("membersInfo ",membersInfo)
    //     this.setState({
    //         data: membersInfo
    //     })
    // })

    // }
    // }
    inviteFriends() {
        Actions.InviteFriends({ GroupData: this.props.data });
    }
    map() {
        Actions.Map({ circleMap: this.state.data });
    }
    leave() {
        console.log(this.props.data);
        var groupKey = this.props.data.key;
        firebase.database().ref('joinGroups/' + firebase.auth().currentUser.uid+"/"+groupKey).remove();
        var Rootref = firebase.database().ref().child("groups/" +groupKey+"/members").orderByChild('member').equalTo(firebase.auth().currentUser.uid);
        if (Rootref != null) {
            Rootref.on("value", snap => {
                var data = snap.val();
                console.log("data",data);
                   for (let key in data) {
                        firebase.database().ref().child("groups/" +groupKey+"/members/"+key).remove();
                    }
            })
        }
        Actions.pop();
    }
    render() {
        console.log(this.state.data);
        // <List>
        //     <ListItem button >
        //         
        //             
        //         </Body>
        //     </ListItem>
        // </List>
        return (
            <View style={styles.container}>
                <View>
                    <Header style={styles.header}>
                        <Body style={{ justifyContent: 'center', alignItems: "center", }}>
                            <Text style={{ color: "#fff" }}>Admin</Text>
                            <Text style={{ color: "#fff" }}>{this.props.data.adminName}</Text>
                        </Body>
                    </Header>
                </View>
                {this.state.data[0] ?
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.data.map((val, key) => (
                            <View style={styles.list}>
                                <TouchableOpacity >
                                    <Text style={styles.friendList}>{val.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={styles.map}>
                            <TouchableOpacity onPress={() => this.map()} >
                                <Text style={{ color: "#fff" }}>Map</Text>
                            </TouchableOpacity>
                        </View>
                        {this.props.data.adminId ?
                            <View style={styles.invite_leave}>
                                <TouchableOpacity onPress={() => this.inviteFriends()} >
                                    <Text style={{ color: "#fff" }}>Invite Friends</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.invite_leave}>
                                <TouchableOpacity onPress={() => this.leave()} >
                                    <Text style={{ color: "#fff" }}>Leave</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>
                    : <View><Spinner /></View>}
                <View style={styles.footer}>
                    <Text style={styles.textInput}></Text>
                </View>
            </View>

        )
    }
}
export default connect(mapStateToProps)(Members)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        justifyContent: 'center', alignItems: "center", marginLeft: 10, marginRight: 10, position: 'relative',
        backgroundColor: '#38b759', padding: 10, color: "#fff", borderRadius: 10
    },
    invite_leave: {
        justifyContent: 'center', alignItems: "center", marginLeft: 10, marginRight: 10, position: 'relative',
        backgroundColor: '#38b759', padding: 10, color: "#fff", borderRadius: 10, marginTop: 10
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
    inviteList: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#2980b9',
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