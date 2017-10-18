import React from 'react';
import ActionRequests from '../actions/actionRequests.js'


function reducerRequests(state = false, action) {
  switch (action.type) {
    case ActionRequests.REQUEST:
     console.log("dataReducer",action.data );
      return action.data        
    // case ActionRequests.LENGTH:
    //   return action.length
    default:
      return state
  }
}
export default reducerRequests;