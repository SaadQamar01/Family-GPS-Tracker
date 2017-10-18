export default class ActionCircle {

    // static properties to be used in reducer for switch cases
    static CIRCLE = "CIRCLE";

    // static functions to be mapped with dispatch in component
    static circle(data) {
        return { 
            type: this.CIRCLE,
            data: data
        }
    }

}