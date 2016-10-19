import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import reducer from '../reducers';

export default initialState => {
  let store = createStore(reducer, initialState, applyMiddleware(routerMiddleware(hashHistory)));
  return store;
}
