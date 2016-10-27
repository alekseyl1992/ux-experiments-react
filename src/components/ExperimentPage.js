import React, { PropTypes } from 'react';

class SheetPage extends React.Component {
  render() {
    var colsCount = 5;
    var rowsCount = 20;

    var data = [
      ['Иванов', 25, 25, 25, 25, 100, 5],
      ['Иванов', 25, 25, 25, 25, 100, 5],
      ['Иванов', 25, 25, 25, 25, 100, 5]
    ];

    var rows = data.map(row, rowId => {
      var cols = col.map(value, colId => {
        return <td key={colId}>{value}</td>;
      });

      var score = row[row.length - 1];

      return <tr key={rowId} style={style}>{cols}</tr>;
    });

    return (
      <div className="b-sheet-page well text-center">
        <h2>Экспериментальная страница</h2>
        <table className="table">
          {rows}
        </table>
      </div>
    );
  }
}

SheetPage.propTypes = {
};

export default SheetPage;
