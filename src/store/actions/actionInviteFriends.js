export default class ActionInviteFriends {

    // static properties to be used in reducer for switch cases
    static INVITE = "INVITE";

    // static functions to be mapped with dispatch in component
    static invite(data) {
        return { 
            type: this.INVITE,
            data: data
        }
    }

}