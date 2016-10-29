import React from 'react';
import _ from 'lodash';

class QuestionsPage extends React.Component {
  onAnswer(e) {
    e.preventDefault();

    let data = {};

    this.props.onAnswer(data);
  }

  onChange(questionEntry, value) {
    questionEntry.actualAnswer = parseInt(value);
  }

  render() {
    let colorsToCountsMap = {};
    let nameToColorMap = {};

    let sheet = this.props.current.sheet;
    sheet.forEach((row, rowId) => {
      row.forEach((value, colId) => {
        let colorId = value.colorId;
        if (colorId in colorsMap)
          ++colorsToCountsMap[colorId];
        else
          colorsToCountsMap[colorId] = 1;

        let name = value.row[0];
        nameToColorMap[name] = colorId;
      }
    });

    // количественные оценки
    let counts = [];
    _.forEach(colors2CountsMap, ((color, count) => {
      counts.push({
        color: color,
        actualAnswer: null,
        rightAnswer: count
      });
    });

    let countsMarkup = counts.map((countsEntry) => {
      let uid = _.uuid();
      let key = 'colorsEntry-' + uid;

      return (
        <div className="form-group" key={key}>
          <label htmlFor={key} className="col-sm-2 control-label">
            {countsEntry.color}
          </label>
          <div className="col-sm-10">
            <input type="number"
                   className="form-control"
                   id={key}
                   onChange={this.onChange.bind(this, countsEntry)}
                   defaultValue="1" />
          </div>
        </div>
      );
    });

    // качественные оценки
    let colorsQuestionsCount = 10;
    let colors = _.map(_.sampleSize(nameToColorMap, colorsQuestionsCount), (name, colorId) => {
      colors.push({
        name: name,
        actualAnswer: null,
        rightAnswer: colorId
      });
    });

    let colorsMarkup = colors.map((colorsEntry) => {
      let uid = _.uuid();
      let key = 'colorsEntry-' + uid;

      return (
        <div className="form-group" key={key}>
          <label htmlFor={key} className="col-sm-2 control-label">
            {colorsEntry.name}
          </label>
          <div className="col-sm-10">
            <input type="number"
                   className="form-control"
                   id={key}
                   onChange={this.onChange.bind(this, colorsEntry)}
                   defaultValue="1" />
          </div>
        </div>
      );
    });

    this.props.appendQuestions(counts, colors);

    return (
      <div className="b-questions-page well text-center">
        <h2>Оценка качества восприятия</h2>
        <form className="b-input__form form-horizontal">
          <div>
            <h3>Сколько строк было отмечено соответствующими цветами:</h3>
            {countsMarkup}
          </div>

          <hr />

          <div>
            <h3>Каким цветом были отмечены следующие записи:</h3>
            {colorsMarkup}
          </div>

          <button className="btn btn-lg btn-primary"
                  onClick={this.onAnswer.bind(this)}>Продолжить</button>
        </form>
      </div>
    )
  }
}

export default QuestionsPage;
