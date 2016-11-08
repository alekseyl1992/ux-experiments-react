import React from 'react';
import ColorBox from 'components/ColorBox';

class ResultsPage extends React.Component {
  render() {
    const schemes = this.props.schemes;

    const rows = schemes.map((scheme, schemeId) => {
      const colors = scheme.colors.map(color =>
        <ColorBox color={ color } key={ color } />
      );

      return (
        <tr key={ schemeId }>
          <th role="row">{ schemeId + 1 }</th>
          <td>{ colors }</td>
          <td>{ Math.floor(scheme.score * 100) }</td>
        </tr>
      );
    });

    return (
      <div className="b-results-page text-center">
        <h2>Результаты</h2>
        <div className="col-md-8 col-md-offset-2">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>№</th>
                <th className="text-center">Схема</th>
                <th className="text-center">Итоговая оценка</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ResultsPage;
