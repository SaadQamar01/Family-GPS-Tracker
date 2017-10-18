import React from 'react';
import ActionInviteFriends from '../actions/actionInviteFriends.js'


function reducerInviteFriends(state = false, action) {
  switch (action.type) {
    case ActionInviteFriends.INVITE:
      return action.data
    default:
      return state
  }
}
export default reducerInviteFriends;