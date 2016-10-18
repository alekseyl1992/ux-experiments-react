import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, push } from 'react-router-redux';
import reducers from '../reducers';

export default initialState => {
  let store = createStore(reducers, applyMiddleware(routerMiddleware(hashHistory)));
  return store;
}
