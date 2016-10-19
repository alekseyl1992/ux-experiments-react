import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SketchPicker } from 'react-color';

import { startExperiment, addScheme, removeScheme } from '../actions';

class ParamsPage extends React.Component {
  onStart(e) {
    e.preventDefault();

    this.props.dispatch(startExperiment(_.mapValues(this.refs, field => parseFloat(field.value))));
  }

  onAddScheme(e) {
    e.preventDefault();

    const colorsCount = parseInt(this.refs.colorsPerScheme.value);
    this.props.dispatch(addScheme(colorsCount));
  }

  onRemoveScheme(scheme, e) {
    e.preventDefault();

    this.props.dispatch(removeScheme(scheme));
  }

  render() {
    const schemes = this.props.schemes.map(scheme => {
      let pickers = scheme.colors.map((color, key) => 
        <SketchPicker key={key} onChange={this.onColorChanged.bind(this)} />);

      return (
        <div key={scheme.key}>
          {pickers}
          <button className="btn btn-sm btn-danger" onClick={this.onRemoveScheme.bind(this, scheme)}>x</button>
        </div>
      );
    });

    return (
      <div className="b-params-page well text-center">
        <h2>Параметры эксперимента</h2>
        <form className="b-params__form form-horizontal">
          <input ref="colorsPerScheme" type="number" defaultValue="3" />
          <button className="btn btn-lg btn-default" onClick={this.onAddScheme.bind(this)}>Добавить схему</button>
          <button className="btn btn-lg btn-primary" onClick={this.onStart.bind(this)}>Начать</button>
        </form>
        <div>
          {schemes}
        </div>
      </div>
    )
  }
}

ParamsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  schemes: PropTypes.array.isRequired
}

ParamsPage = connect(state => ({
  schemes: state.schemes
}))(ParamsPage);

export default ParamsPage;
