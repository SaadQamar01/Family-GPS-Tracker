import ActionMembers from "./../actions/actionMembers.js";
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class MiddlewareMembers {

    static asyncMembers(data) {
        return (dispatch) => {
            var Rootref = firebase.database().ref().child("groups/" + data.key + "/" + "members");
            if (Rootref != null) {
                Rootref.on("value", snap => {
                    var data = snap.val();
                    console.log("data", data);
                    // console.log("uid",firebase.auth().currentUser.uid);
                    let mData = [];
                    for (let key in data) {
                        data[key].key = key
                        mData.push(data[key])
                        // keys.push(key)
                    }
                    console.log(mData);
                    var membersInfo = [];
                    for (var i = 0; i < mData.length; i++) {
                        var info = firebase.database().ref().child("users/" + mData[i].member);
                        info.on("value", snap => {
                            var userInfo = snap.val();
                            membersInfo.push(userInfo)
                        })
                    }
                    console.log("membersInfo ", membersInfo)
                    dispatch(ActionMembers.member(membersInfo))
                })

            }
        }
    }
}
