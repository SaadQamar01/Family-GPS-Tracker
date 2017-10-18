import ActionRequests from "./../actions/actionRequests.js";
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class MiddlewareRequests {

    static asyncRequests() {
        return (dispatch) => {
            var Rootref = firebase.database().ref().child("users/" + firebase.auth().currentUser.uid + "/requests");
            if (Rootref != null) {
                Rootref.on("value", snap => {
                    var data = snap.val();
                    let rData = [];
                    for (let key in data) {
                        data[key].key = key
                        rData.push(data[key])
                        // keys.push(key)
                    }
                    console.log("data",rData);
                    dispatch(ActionRequests.requests(rData));
                })
            }
        }
    }
    // static asyncRequestsLength() {
    //     return (dispatch) => {
    //         var Rootref = firebase.database().ref().child("users/" + firebase.auth().currentUser.uid + "/requests");
    //         if (Rootref != null) {
    //             Rootref.on("value", snap => {
    //                 var data = snap.val();
    //                 // console.log("data",data);
    //                 let rData = [];
    //                 for (let key in data) {
    //                     data[key].key = key
    //                     rData.push(data[key])
    //                     // keys.push(key)
    //                 }
    //                 var length=rData.length;
    //                 dispatch(ActionRequests.requestsLength(length));
    //             })
    //         }
    //     }
    // }
}
