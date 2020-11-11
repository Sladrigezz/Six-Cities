import {combineReducers} from 'redux';
import user from './user.js';
import data from './data.js';

import {ActionCreator as dataActionCreator} from './data.js';
import {ActionCreator as userActionCreator} from './user.js';

export const ActionCreator = Object.assign(
    dataActionCreator,
    userActionCreator
);

export default combineReducers({
  user,
  data
});

