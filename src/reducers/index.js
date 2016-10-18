import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { Experiment } from '../actions';

const start = (state, action) => {
  switch (action.type) {
    case Experiment.START:
      return {
        id: action.id,
        params: action.data
      };
    default:
      if (!state) {
        return {
          id: action.id,
          params: {}
        };
      }

      return state;
  }
}

export default combineReducers({
  routing: routeReducer,
  start
});
