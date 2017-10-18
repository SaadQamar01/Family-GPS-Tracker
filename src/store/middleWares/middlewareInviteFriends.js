import ActionInviteFriends from "./../actions/actionInviteFriends.js";
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class MiddlewareInviteFriends {

    static asyncInviteFriends(detail) {
        return (dispatch) => {
        var Rootref = firebase.database().ref().child("users")
        var currentUser=firebase.auth().currentUser.uid;
        if(Rootref!=null){
        Rootref.on("value", snap => {
            var data = snap.val();
            // console.log("data",data);
            let uData = [];
            for (let key in data) {
                if(currentUser!==key){
                data[key].key=key;
                uData.push(data[key])
                }
            }
            dispatch(ActionInviteFriends.invite(uData))
        })
        }
        }
    }
}
