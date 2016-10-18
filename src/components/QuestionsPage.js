import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Experiment } from '../actions';

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

QuestionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

QuestionsPage = connect()(QuestionsPage)

export default QuestionsPage;
