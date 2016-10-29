import React, { PropTypes } from 'react';

class SheetPage extends React.Component {
  render() {
    const rows = this.props.sheet.map((row, rowId) => {
      const cols = row.row.map((value, colId) => {
        return <td key={colId}>{value}</td>;
      });

      const color = this.props.currentScheme.colors[row.colorId];
      const style = {
        backgroundColor: color
      };

      return <tr key={rowId} style={style}>{cols}</tr>;
    });

    return (
      <div className="b-sheet-page well text-center">
        <h2>Экспериментальная страница</h2>
        <table className="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

SheetPage.propTypes = {
};

export default SheetPage;
