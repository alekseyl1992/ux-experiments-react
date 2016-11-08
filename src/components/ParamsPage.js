import React from 'react';
import CustomPicker from 'components/CustomPicker';

class ParamsPage extends React.Component {
  onStartExperiment(e) {
    e.preventDefault();
    this.props.onStartExperiment();
  }

  onAddScheme(e) {
    e.preventDefault();
    this.props.onAddScheme();
  }

  onRemoveScheme(scheme, e) {
    e.preventDefault();
    this.props.onRemoveScheme(scheme);
  }

  onColorChanged(scheme, colorId, colorValue) {
    this.props.onUpdateScheme(scheme, colorId, colorValue);
  }

  onParamsApply(e) {
    e.preventDefault();

    this.props.onUpdateParams({
      colorsPerScheme: parseInt(this.refs.colorsPerScheme.value),
      rowsCount: parseInt(this.refs.rowsCount.value),
      exposureTime: parseFloat(this.refs.exposureTime.value),
      repeatCount: parseFloat(this.refs.repeatCount.value)
    });
  }

  render() {
    const colorsCount = parseInt(this.props.params.colorsPerScheme);
    const columnSize = Math.floor(12 / colorsCount);
    const columnClass = 'col-md-' + columnSize;

    const schemes = this.props.schemes.map(scheme => {
      let pickers = scheme.colors.map((color, key) =>
        <div className={columnClass} key={key}>
          <CustomPicker
            color={color}
            onChange={this.onColorChanged.bind(this, scheme, key)}
            disableAlpha={true} />
        </div>
      );

      return (
        <div key={scheme.key} className="row b-scheme">
          <div className="h3">
            Схема {scheme.key}
            <button
              className={'btn btn-sm btn-danger b-scheme__remove'}
              onClick={this.onRemoveScheme.bind(this, scheme)}>x</button>
          </div>
          <div className="b-scheme__colors">
            {pickers}
          </div>
        </div>
      );
    });

    return (
      <div className="b-params-page well text-center">
        <h2>Параметры эксперимента</h2>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="colorsPerScheme" className="col-sm-2 control-label">Цветов в схеме</label>
            <div className="col-sm-10">
              <input ref="colorsPerScheme"
                     type="number"
                     className="form-control"
                     id="colorsPerScheme"
                     defaultValue={this.props.params.colorsPerScheme} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rowsCount" className="col-sm-2 control-label">Количество строк</label>
            <div className="col-sm-10">
              <input ref="rowsCount"
                     type="number"
                     className="form-control"
                     id="rowsCount"
                     defaultValue={this.props.params.rowsCount} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exposureTime" className="col-sm-2 control-label">Время показа (сек.)</label>
            <div className="col-sm-10">
              <input ref="exposureTime"
                     type="number"
                     className="form-control"
                     id="exposureTime"
                     defaultValue={this.props.params.exposureTime} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="repeatCount" className="col-sm-2 control-label">Количество повторов</label>
            <div className="col-sm-10">
              <input ref="repeatCount"
                     type="number"
                     className="form-control"
                     id="repeatCount"
                     defaultValue={this.props.params.repeatCount} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button className="btn btn-default" onClick={this.onParamsApply.bind(this)}>Применить</button>
            </div>
          </div>
        </form>

        <div>
          {schemes}
        </div>

        <hr />

        <form className="b-params__form form-horizontal">
          <button className="btn btn-lg btn-default" onClick={this.onAddScheme.bind(this)}>Добавить схему</button>
          <button className="btn btn-lg btn-primary" onClick={this.onStartExperiment.bind(this)}>Начать</button>
        </form>
      </div>
    )
  }
}

export default ParamsPage;
