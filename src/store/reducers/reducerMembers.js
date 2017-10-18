import React from 'react';
import ActionMembers from '../actions/actionMembers.js'


function reducerMembers(state = false, action) {
  switch (action.type) {
    case ActionMembers.MEMBER:
      return action.data
    default:
      return state
  }
}
export default reducerMembers;