import React, { Component } from 'react';
import CreateGroup from './createGroup.js';
import Map from './Map.js';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Members from './members.js';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import MiddlewareInviteFriends from './../store/middleWares/middlewareInviteFriends.js';
import { Container, Header, Content, Card, CardItem, Footer, FooterTab, Item, Thumbnail, Title, Right, Input, Icon, Body, Left, List, ListItem } from 'native-base';
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
        InviteFriendsData: state.reducerInviteFriends,
    };
}
class InviteFriends extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            search: '',
            inviteCheck: true,
            groupData:{}
        }
    }
    componentWillMount() {
        console.log(this.props.GroupData);
        this.setState(
            {
                groupData: this.props.GroupData
            }
        )
        store.dispatch(MiddlewareInviteFriends.asyncInviteFriends());
    }
    componentWillReceiveProps(props) {
        this.setState({
            data: props.InviteFriendsData,
        })
    }
    friends = (obj) => {
        // console.log(this.state.search);
        return obj.name.search(this.state.search) >= 0;
    }
    invite = (value) => {
         var rootRef = firebase.database().ref();
        const speedRef = rootRef.child("users" + "/" + value.key+"/"+"requests/"+this.props.GroupData.key).set({
            admin:this.state.groupData.adminName,
            groupKey:this.state.groupData.key,
            groupName:this.state.groupData.gName,
            groupId:this.state.groupData.id,
        })

        alert("Invitation Sent");
    }
    render() {
        // console.log(this.state.data)
        // console.log(this.state.key)
        return (
            <View style={styles.container}>
                <View>
                    <Header searchBar rounded style={styles.header}>
                        <Item>
                            <Icon name="person" style={{color:'#38b759'}}/>
                            <Input placeholder="Search" onChangeText={(search) => this.setState({ search })} />
                            <Icon name="search" style={{color:'#38b759'}}/>
                        </Item>
                    </Header>
                </View>
                {this.state.data ?
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.data.filter(this.friends).map((val, key) => (
                            <View style={styles.list}>
                                <TouchableOpacity>
                                    <Text style={styles.friendList}>{val.name}</Text>
                                </TouchableOpacity>
                                {this.state.inviteCheck ?
                                    <TouchableOpacity style={styles.inviteList} onPress={() => this.invite(val)}>
                                        <Text style={styles.inviteListText}>Invite</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.inviteList} onPress={() => this.invite(val)}>
                                        <Text style={styles.inviteListText}>Send</Text>
                                    </TouchableOpacity>
                                }
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
export default connect(mapStateToProps)(InviteFriends)
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
    inviteList: {
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


                    // {this.state.data ?
                    //     <List avatar
                    //         dataArray={this.state.data}
                    //         renderRow={(d) =>

                    //             <ListItem button >
                    //                 <Body>
                    //                     <Text>{d.name}</Text>
                    //                 </Body>
                    //                 <Right>
                    //                     <TouchableOpacity onPress={() => this.invite(d)}>
                    //                         <Text>Invite</Text>
                    //                     </TouchableOpacity>
                    //                 </Right>
                    //             </ListItem>
                    //         }>
                    //     </List>
                    //     :
                    //     <View> <Text>Empty</Text></View>
                    // }