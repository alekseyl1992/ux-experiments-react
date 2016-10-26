import React, { PropTypes } from 'react';
import _ from 'lodash';
import { SketchPicker } from 'react-color';

class ParamsPage extends React.Component {
  onStartExperiment(e) {
    e.preventDefault();

    this.props.onStartExperiment(_.mapValues(this.refs, field => parseFloat(field.value)));
  }

  onAddScheme(e) {
    e.preventDefault();
    this.props.onAddScheme(this.props.colorsPerScheme);
  }

  onRemoveScheme(scheme, e) {
    e.preventDefault();
    this.props.onRemoveScheme(scheme);
  }

  onColorChanged(e) {
    
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
          <button className="btn btn-lg btn-default" onClick={this.onAddScheme.bind(this)}>Добавить схему</button>
          <button className="btn btn-lg btn-primary" onClick={this.onStartExperiment.bind(this)}>Начать</button>
        </form>
        <div>
          {schemes}
        </div>
      </div>
    )
  }
}

ParamsPage.propTypes = {
  schemes: PropTypes.array.isRequired,
  onStartExperiment: PropTypes.func.isRequired
}

export default ParamsPage;
