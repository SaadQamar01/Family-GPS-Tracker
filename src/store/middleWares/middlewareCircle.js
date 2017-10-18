import ActionCircle from "./../actions/actionCircle.js";
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class MiddlewareCircle {

    static asyncCircle(detail) {
        return (dispatch) => {
            var Rootref = firebase.database().ref().child("groups").orderByChild('adminId').equalTo(firebase.auth().currentUser.uid);
            if (Rootref != null) {
                Rootref.on("value", snap => {
                    var data = snap.val();
                    // console.log("data",data);
                    let gData = [];
                    for (let key in data) {
                        data[key].key = key
                        gData.push(data[key])
                        // keys.push(key)
                    }
       var memberRef= firebase.database().ref('joinGroups/'+firebase.auth().currentUser.uid);
                          if (memberRef != null) {
                memberRef.on("value", snap => {
                    var data1 = snap.val();
                    console.log("data1",data1);
                    let mData = [];
                    for (let key1 in data1) {
                        data1[key1].key = key1
                        mData.push(data1[key1])
                        // keys.push(key)
                }
                console.log(mData)
                    var newData=gData.concat(mData)
                    console.log("newData ",newData);
                    dispatch(ActionCircle.circle(newData))
                })
            }
                })
            }
        }
    }
}
