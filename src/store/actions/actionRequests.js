export default class ActionRequests {

    // static properties to be used in reducer for switch cases
    static REQUEST = "REQUEST";
    static LENGTH="LENGTH";

    // static functions to be mapped with dispatch in component
    static requests(data) {
         console.log("dataAction",data);
        return { 
            type: this.REQUEST,
            data: data
        }
    }
    // static requestsLength(length) {
    //     return { 
    //         type: this.LENGTH,
    //         length: length
    //     }
    // }

}