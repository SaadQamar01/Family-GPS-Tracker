import React from 'react';
import ActionLogin from '../actions/actionLogin.js'


function reducerLogin(state = false, action) {
  switch (action.type) {
    case ActionLogin.LOG_IN:
      return action.isLogin
    default:
      return state
  }
}
export default reducerLogin;