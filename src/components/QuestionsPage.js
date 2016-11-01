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
    const counts = this.props.questions.counts;
    const colors = this.props.questions.colors;

    let countsMarkup = counts.map((countsEntry) => {
      let uid = _.uniqueId();
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

    let colorsMarkup = colors.map((colorsEntry) => {
      let uid = _.uniqueId();
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
