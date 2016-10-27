window.jQuery = require('jquery');
require('bootstrap-webpack');
require('normalize.css');
require('styles/App.css');

import React from 'react';
import _ from 'lodash';

import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import BasePage from 'components/BasePage';
import ParamsPage from 'components/ParamsPage';
import ExperimentPage from 'components/ExperimentPage';
import QuestionsPage from 'components/QuestionsPage';
import ResultsPage from 'components/ResultsPage';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schemes: [],
      params: {
        colorsPerScheme: 3,
        exposureTime: 5
      }
    };

    this.routes = null;
  }

  componentWillMount() {
    this.routes = (
      <Route path="/" component={BasePage}>
        <IndexRoute component={this.renderParamsPage.bind(this)} />
        <Route path="experiment" component={this.renderExperimentPage.bind(this)} />
        <Route path="questions" component={this.renderQuestionsPage.bind(this)} />
        <Route path="results" component={this.renderResultsPage.bind(this)} />
      </Route>
    );

    this.addScheme();
  }

  startExperiment(params) {
    hashHistory.push('/experiment');
  }

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  addScheme() {
    var scheme = {
      key: _.uniqueId(),
      colors: _.fill(Array(this.state.params.colorsPerScheme), 0).map(this.randomColor.bind(this))
    };

    this.state.schemes.push(scheme);

    this.setState({
      schemes: this.state.schemes
    });
  }

  removeScheme(scheme) {
    _.remove(this.state.schemes, scheme);

    this.setState({
      schemes: this.state.schemes
    });
  }

  updateScheme(scheme, colorId, colorValue) {
    scheme.colors[colorId] = colorValue.hex;
  }

  updateParams(params) {
    var schemes = this.state.schemes.map(scheme => {
      while (params.colorsPerScheme > scheme.colors.length) {
        scheme.colors.push(this.randomColor());
      }

      if (params.colorsPerScheme < scheme.colors.length) {
        scheme.colors = _.slice(scheme.colors, 0, params.colorsPerScheme);
      }

      return scheme;
    });

    this.setState({
      params,
      schemes
    });
  }

  generateSheet(colorsCount, rowsCount, colsCount) {
    var colsCount = 5;
    var rowsCount = 20;

    var data = [{
      row: ['Иванов', 25, 25, 25, 25, 100, 5],
      colorId: 0
    }, {
      row: ['Иванов', 25, 25, 25, 25, 100, 5],
      colorId: 0
    }, {
      row: ['Иванов', 25, 25, 25, 25, 100, 5],
      colorId: 0
    }];

    return data;
  }

  renderParamsPage() {
    return (
      <ParamsPage
        {...this.state}
        onStartExperiment={this.startExperiment.bind(this)}
        onAddScheme={this.addScheme.bind(this)}
        onRemoveScheme={this.removeScheme.bind(this)}
        onUpdateScheme={this.updateScheme.bind(this)}
        onUpdateParams={this.updateParams.bind(this)}
      />
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
