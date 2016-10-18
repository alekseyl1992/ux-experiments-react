import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Experiment } from '../actions';

class ParamsPage extends React.Component {

  onStart(e) {
    e.preventDefault();

    this.props.dispatch(Experiment.start(_.mapValues(this.refs, field => parseFloat(field.value))));
    this.props.history.push('/sheet');
  }

  render() {
    return (
      <div className="b-params-page well text-center">
        <h2>Параметры эксперимента</h2>
        <form className="b-params__form form-horizontal">
          <button className="btn btn-lg btn-primary" onClick={this.onStart.bind(this)}>Начать</button>
        </form>
      </div>
    )
  }
}

ParamsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

ParamsPage = connect()(ParamsPage);

export default ParamsPage;