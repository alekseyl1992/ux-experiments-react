  import React from 'react';
import _ from 'lodash';

import ColorBox from 'components/ColorBox';


class QuestionsPage extends React.Component {
  onAnswer(e) {
    e.preventDefault();

    let data = {};
    this.props.onAnswer(data);
  }

  onCountsChange(questionEntry, e) {
    questionEntry.actualAnswer = parseInt(e.target.value);
  }

  onColorsChange(questionEntry, e) {
    questionEntry.actualAnswer = e.target.value;
    this.forceUpdate();
  }

  render() {
    const counts = this.props.current.questions.counts;
    const colors = this.props.current.questions.colors;

    const schemeId = this.props.current.schemeId;
    const scheme = this.props.schemes[schemeId];

    const colorIdToColor = colorId => scheme.colors[colorId];

    const countsMarkup = counts.map((countsEntry) => {
      const uid = _.uniqueId();
      const key = 'colorsEntry-' + uid;

      return (
        <div className="form-group" key={key}>
          <label htmlFor={ key } className="col-sm-2 control-label">
            <ColorBox color={ colorIdToColor(countsEntry.color) } />
          </label>
          <div className="col-sm-10">
            <input type="number"
                   className="form-control"
                   id={ key }
                   onChange={ this.onCountsChange.bind(this, countsEntry) }
                   defaultValue={ countsEntry.actualAnswer } />
          </div>
        </div>
      );
    });

    const colorsMarkup = colors.map((colorsEntry) => {
      console.log(colorsEntry.actualAnswer);

      const uid = _.uniqueId();
      const key = 'colorsEntry-' + uid;

      const options = scheme.colors.map(color =>
        <option value={ color } key={ color } style={{ backgroundColor: color }}>
          { color }
        </option>
      );

      return (
        <div className="form-group" key={key}>
          <label htmlFor={key} className="col-sm-2 control-label">
            {colorsEntry.name}
          </label>
          <div className="col-sm-10">
            <select className="form-control"
                    id={key}
                    onChange={this.onColorsChange.bind(this, colorsEntry)}
                    style={{ backgroundColor: colorsEntry.actualAnswer }}
                    defaultValue={ colorsEntry.actualAnswer }>
              <option>---</option>
              { options }
            </select>
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
            { countsMarkup }
          </div>

          <hr />

          <div>
            <h3>Каким цветом были отмечены следующие записи:</h3>
            { colorsMarkup }
          </div>

          <button className="btn btn-lg btn-primary"
                  onClick={ this.onAnswer.bind(this) }>Продолжить</button>
        </form>
      </div>
    )
  }
}

export default QuestionsPage;
