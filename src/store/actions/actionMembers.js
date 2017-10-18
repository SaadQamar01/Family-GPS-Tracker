export default class ActionMembers {

    // static properties to be used in reducer for switch cases
    static MEMBER = "MEMBER";

    // static functions to be mapped with dispatch in component
    static member(data) {
        return { 
            type: this.MEMBER,
            data: data
        }
    }

}