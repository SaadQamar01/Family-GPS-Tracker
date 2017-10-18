export default class ActionLogin {

    // static properties to be used in reducer for switch cases
    static LOG_IN = "LOGIN";
    // static DELETE_ALL_PATIENT = "DELETE_ALL_PATIENT";


    // static functions to be mapped with dispatch in component
    static logIn(isLogin) {
        return { 
            type: this.LOG_IN,
            isLogin: isLogin
        }
    }

}