import ActionLogin from "./../actions/actionLogin.js";
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';
import * as firebase from 'firebase';
//Update in counter 13 -- create Middleware
export default class MiddlewareLogin {

    static asyncLogin(detail) {
        return (dispatch) => {
            var Email = detail.Email
            var Password = detail.Password
            var isTrue = false;
            const auth = firebase.auth();
            auth.signInWithEmailAndPassword(Email, Password)
                .then(() => {
                    isTrue = true
                    Actions.Dashboard();
                    dispatch(ActionLogin.logIn(isTrue))
                })
                .catch((error) => {
                    isTrue=false
                    dispatch(ActionLogin.logIn(isTrue))
                    alert(JSON.stringify(error.message));
                })

        }
    }
    static asyncLoginFalse() {
        return (dispatch) => {
                isTrue=false
                alert(isTrue)
             dispatch(ActionLogin.logIn(isTrue))
        }
    }
}
