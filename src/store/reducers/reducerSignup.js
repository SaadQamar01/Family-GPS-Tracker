import React from 'react';
import ActionSignup from '../actions/actionSignup.js'


function reducerSignup(state = [], action) {
  switch (action.type) {
    case ActionSignup.SIGN_UP:
      // console.log(action.patientsData);
      return action.isSignin
    default:
      return state
  }
}
export default reducerSignup;