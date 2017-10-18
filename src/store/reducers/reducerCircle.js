import React from 'react';
import ActionCircle from '../actions/actionCircle.js'


function reducerCircle(state = false, action) {
  switch (action.type) {
    case ActionCircle.CIRCLE:
      return action.data
    default:
      return state
  }
}
export default reducerCircle;