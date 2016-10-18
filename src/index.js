import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import BasePage from './components/BasePage';
import ParamsPage from './components/ParamsPage';
import SheetPage from './components/SheetPage';
import QuestionsPage from './components/QuestionsPage';
import ResultsPage from './components/ResultsPage';


const store = configureStore();

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={BasePage}>
        <IndexRoute component={ParamsPage}/>
        <Route path="sheet" component={SheetPage}/>
        <Route path="questions" component={QuestionsPage}/>
        <Route path="results" component={ResultsPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
