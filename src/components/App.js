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
      currentScheme: null,
      params: {
        colorsPerScheme: 3,
        rowsCount: 20,
        exposureTime: 5
      },
      sheet: null
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

  startExperiment() {
    const params = this.state.params;
    const sheet = this.generateSheet(params.rowsCount, params.colorsPerScheme);
    const currentScheme = this.state.schemes[0];
    this.setState({ sheet, currentScheme });

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
  'Леонтьев',
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
