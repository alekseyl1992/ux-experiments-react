import React, { PropTypes } from 'react';
import _ from 'lodash';

class QuestionsPage extends React.Component {
  onAnswer(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="b-QuestionsPage well text-center">
        <h2>Входные параметры</h2>
        <form className="b-input__form form-horizontal">
          <button className="btn btn-lg btn-primary" onClick={this.onAnswer.bind(this)}>Дальше</button>
        </form>
      </div>
    )
  }
}

export default QuestionsPage;
