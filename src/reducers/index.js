import _ from 'lodash';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const params = handleActions({
  START_EXPERIMENT: (state, action) => state
}, {});

export const schemes = handleActions({
  ADD_SCHEME: (schemes, action) => (console.log('ADD_SCHEME'), schemes.push(action.payload), schemes),
  REMOVE_SCHEME: (schemes, action) => (_.remove(schemes, action.payload), schemes)
}, []);

export default combineReducers({
  routing: routerReducer,
  params,
  schemes,
  testReducer(state, action) {
    console.log(action);
    return {};
  }
});
