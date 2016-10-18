import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import reducers from '../reducers';

export default initialState => {

  const reduxRouterMiddleware = syncHistory(browserHistory),
    createStoreWithMiddleware = applyMiddleware(
      reduxRouterMiddleware,
      thunkMiddleware
    )(createStore),
    store = createStoreWithMiddleware(reducers, initialState);

  return store;
}
