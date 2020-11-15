import {combineReducers} from 'redux';
import user from './user.js';
import data from './data.js';
import sort from './sort.js';

import {ActionCreator as dataActionCreator} from './data.js';
import {ActionCreator as userActionCreator} from './user.js';
import {ActionCreator as sortActionCreator} from './sort.js';

export const ActionCreator = Object.assign(
    dataActionCreator,
    userActionCreator,
    sortActionCreator
);

export default combineReducers({
  user,
  data,
  sort
});

