window.jQuery = require('jquery');
require('bootstrap-webpack');
require('normalize.css');
require('styles/App.css');

import React from 'react';

import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import BasePage from 'components/BasePage';
import ParamsPage from 'components/ParamsPage';
import ExperimentPage from 'components/ExperimentPage';
import QuestionsPage from 'components/QuestionsPage';
import ResultsPage from 'components/ResultsPage';

function wrapper(renderer) {
  return class Wrapper extends React.Component {
    render() {
      return renderer();
    }
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schemes: []
    };

    this.routes = null;
  }

  componentWillMount() {
    this.routes = (
      <Route path="/" component={BasePage}>
        <IndexRoute component={wrapper(this.renderParamsPage.bind(this))} />
        <Route path="experiment" component={wrapper(this.renderExperimentPage.bind(this))} />
        <Route path="questions" component={wrapper(this.renderQuestionsPage.bind(this))} />
        <Route path="results" component={wrapper(this.renderResultsPage.bind(this))} />
      </Route>
    );
  }

  startExperiment(params) {
    hashHistory.push('/experiment');
  }

  addScheme(colorsCount) {
    var scheme = {
      key: _.uniqueId(),
      colors: _.fill(Array(colorsCount), 'white'),
    };

    this.state.schemes.push(scheme);

    this.setState({
      schemes: this.state.schemes
    });
    debugger;
  }

  removeScheme(scheme) {
    _.remove(this.state.schemes, scheme);

    this.setState({
      schemes: this.state.schemes
    });
  }

  renderParamsPage() {
    return (
      <ParamsPage
        {...this.state}
        colorsPerScheme="3"
        onStartExperiment={this.startExperiment.bind(this)}
        onAddScheme={this.addScheme.bind(this)}
        onRemoveScheme={this.removeScheme.bind(this)} />
    );
  }

  renderParamsPage() {
    return (
      <ParamsPage
        {...this.state}
        colorsPerScheme="3"
        onStartExperiment={this.startExperiment.bind(this)}
        onAddScheme={this.addScheme.bind(this)}
        onRemoveScheme={this.removeScheme.bind(this)} />
    );
  }

  renderExperimentPage() {
    return (
      <ExperimentPage />
    );
  }

  renderQuestionsPage() {
    return (
      <QuestionsPage />
    );
  }

  renderResultsPage() {
    return (
      <ResultsPage />
    );
  }

  render() {
      return (
        <Router history={hashHistory}>
          {this.routes}
        </Router>
      );
  }
}

App.defaultProps = {
};

export default App;
