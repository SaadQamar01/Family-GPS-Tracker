import React from 'react';
import { createStore } from 'redux';
import {combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerSignup from './reducers/reducerSignup.js';
import reducerLogin from './reducers/reducerLogin.js';
import reducerCircle from './reducers/reducerCircle.js';
import reducerInviteFriends from './reducers/reducerInviteFriends.js';
import reducerRequests from './reducers/reducerRequests.js';
import reducerMembers from './reducers/reducerMembers.js';

const middleware = applyMiddleware(thunk);
var combineReducer=combineReducers({reducerSignup,reducerLogin,reducerCircle,reducerInviteFriends,reducerRequests,reducerMembers})
let store = createStore(combineReducer,middleware);
// store.subscribe(() =>
  // console.log(store.getState())
// )
export default store;