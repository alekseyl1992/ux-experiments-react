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

import { subsampleObject } from 'utils';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schemes: [],
      params: {
        colorsPerScheme: 3,
        rowsCount: 15,
        exposureTime: 10,
        colorsQuestionsCount: 5,
        colorsQuestionsWeight: 0.5,
        repeatCount: 1
      },
      current: {
        schemeId: 0,
        iteration: 0,
        sheet: null,
        questions: {
          counts: [],
          colors: []
        }
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
    this.addScheme();
  }

  startExperiment() {
    this.experimentIteration(0, 0);
  }

  experimentIteration(iteration, schemeId) {
    const params = this.state.params;
    const sheet = this.generateSheet(params.rowsCount, params.colorsPerScheme);
    const questions = this.generateQuestions(sheet);

    this.setState({
      current: {
        iteration,
        schemeId,
        questions,
        sheet
      }
    });

    hashHistory.push('/experiment');

    window.setTimeout(() => {
      hashHistory.push('/questions');
    }, this.state.params.exposureTime * 1000);
  }

  answer() {
    const schemeId = this.state.current.schemeId;
    const scheme = this.state.schemes[schemeId];

    scheme.questions.counts = _.concat(
      scheme.questions.counts,
      this.state.current.questions.counts
    );

    scheme.questions.colors = _.concat(
      scheme.questions.colors,
      this.state.current.questions.colors
    );

    if (this.state.current.schemeId + 1 < this.state.schemes.length) {
      // new scheme, same iteration
      this.experimentIteration(
        this.state.current.iteration,
        this.state.current.schemeId + 1);

    } else if (this.state.current.iteration + 1 < this.state.repeatCount) {
      // next iteration, first scheme
      this.experimentIteration(
        this.state.current.iteration + 1,
        0);

    } else {
      // end of experiment
      this.calcScores(this.state.schemes);
      hashHistory.push('/results');
    }   
  }

  generateQuestions(sheet) {
    let colorsToCountsMap = {};
    let nameToColorMap = {};

    // make shure to create question for all colors
    for (let i = 0; i < this.state.params.colorsPerScheme; ++i) {
      colorsToCountsMap[i] = 0;
    }

    sheet.forEach((row, rowId) => {
      let colorId = row.colorId;
      if (colorId in colorsToCountsMap)
        ++colorsToCountsMap[colorId];
      else
        colorsToCountsMap[colorId] = 1;

      let name = row.row[0];
      nameToColorMap[name] = colorId;
    });

    // количественные оценки
    let counts = [];
    _.forEach(colorsToCountsMap, (count, color) => {
      counts.push({
        color: color,
        actualAnswer: 1,
        rightAnswer: count
      });
    });

    // качественные оценки
    let colorsQuestionsCount = this.state.params.colorsQuestionsCount;
    let colors = _.map(subsampleObject(nameToColorMap, colorsQuestionsCount), (colorId, name) => {
      return {
        name: name,
        actualAnswer: 0,
        rightAnswer: colorId
      };
    });

    return {
      counts,
      colors
    };
  }

  randomColor() {
    let s = Math.floor(Math.random() * 16777215).toString(16);
    while (s.length != 6)
      s = '0' + s;

    return '#' + s;
  }

  addScheme() {
    var scheme = {
      key: _.uniqueId(),
      colors: _.fill(Array(this.state.params.colorsPerScheme), 0).map(this.randomColor.bind(this)),
      score: 0,
      questions: {
        counts: [],
        colors: []
      }
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

  generateSheet(rowsCount, colorsCount) {
    let data = [];

    for (let i = 0; i < rowsCount; ++i) {
      let name = App.surnames[_.random(App.surnames.length - 1)] + ' ' +
          App.names[_.random(App.names.length - 1)];

      let scores = [
        _.random(0, 25),
        _.random(0, 25),
        _.random(0, 25),
        _.random(0, 25)
      ];

      let sum = _.sum(scores);

      let row = {
        row: [name, ...scores, sum],
        colorId: Math.floor(sum / 100 * colorsCount)
      };

      data.push(row);
    }

    return data;
  }

  calcScores(schemes) {
    const rowsCount = this.state.params.rowsCount;

    schemes.forEach(scheme => {
      const countsError = scheme.questions.counts.reduce((acc, q) => {
        return acc + Math.abs(q.actualAnswer - q.rightAnswer) / rowsCount;
      }, 0) / scheme.colors.length;

      const colorsError = scheme.questions.colors.reduce((acc, q) => {
        return acc + (q.actualAnswer != q.rightAnswer);
      }, 0) / scheme.questions.colors.length;

      const colorsQuestionsWeight = this.state.params.colorsQuestionsWeight;
      scheme.score = (1 - colorsQuestionsWeight) * (1 - countsError) +
        colorsQuestionsWeight * (1 - colorsError);
    });

    this.setState({ schemes });
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
      <ExperimentPage 
        {...this.state}
      />
    );
  }

  renderQuestionsPage() {
    return (
      <QuestionsPage
        {...this.state}
        onAnswer={this.answer.bind(this)}
      />
    );
  }

  renderResultsPage() {
    return (
      <ResultsPage
        {...this.state}
      />
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

App.surnames = [
  'Васильев',
  'Петров',
  'Смирнов',
  'Михайлов',
  'Фёдоров',
  'Соколов',
  'Яковлев',
  'Попов',
  'Андреев',
  'Алексеев',
  'Александров',
  'Лебедев',
  'Григорьев',
  'Степанов',
  'Семёнов',
  'Павлов',
  'Богданов',
  'Николаев',
  'Дмитриев',
  'Егоров',
  'Волков',
  'Кузнецов',
  'Никитин',
  'Соловьёв',
  'Тимофеев',
  'Орлов',
  'Афанасьев',
  'Филиппов',
  'Сергеев',
  'Захаров',
  'Матвеев',
  'Виноградов',
  'Кузьмин',
  'Максимов',
  'Козлов',
  'Ильин',
  'Герасимов',
  'Марков',
  'Новиков',
  'Морозов',

  'Романов',
  'Осипов',
  'Макаров',
  'Зайцев',
  'Беляев',
  'Гаврилов',
  'Антонов',
  'Ефимов',
  'Леонтьев',  // here I am
  'Давыдов',
  'Гусев',
  'Данилов',
  'Киселёв',
  'Сорокин',
  'Тихомиров',
  'Крылов',
  'Никифоров',
  'Кондратьев',
  'Кудрявцев',
  'Борисов',
  'Жуков',
  'Воробьёв',
  'Щербаков',
  'Поляков',
  'Савельев',
  'Шмидт',
  'Трофимов',
  'Чистяков',
  'Баранов',
  'Сидоров',
  'Соболев',
  'Карпов',
  'Белов',
  'Миллер',
  'Титов',
  'Львов',
  'Фролов',
  'Игнатьев',
  'Комаров',
  'Прокофьев',
  'Быков',
  'Абрамов',
  'Голубев',
  'Пономарёв',
  'Покровский',
  'Мартынов',
  'Кириллов',
  'Шульц',
  'Миронов',
  'Фомин',
  'Власов',
  'Троицкий',
  'Федотов',
  'Назаров',
  'Ушаков',

  'Денисов',
  'Константинов',
  'Воронин',
  'Наумов'
];

App.names = [
  'Александр',
  'Сергей',
  'Владимир',
  'Андрей',
  'Алексей',
  'Дмитрий',
  'Николай',
  'Евгений',
  'Михаил',
  'Юрий',
  'Виктор',
  'Иван',
  'Игорь',
  'Анатолий',
  'Максим',
  'Олег',
  'Павел',
  'Валерий',
  'Константин',
  'Вячеслав',
  'Василий',
  'Денис',
  'Антон',
  'Илья',
  'Виталий',
  'Роман',
  'Никита',
  'Леонид',
  'Геннадий',
  'Владислав'
];

App.defaultProps = {
};

export default App;
