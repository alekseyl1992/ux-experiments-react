import React from 'react';

class SheetPage extends React.Component {
  render() {
    const rows = this.props.current.sheet.map((row, rowId) => {
      const cols = row.row.map((value, colId) => {
        return <td key={colId}>{value}</td>;
      });

      const currentScheme = this.props.schemes[this.props.current.schemeId];
      const color = currentScheme.colors[row.colorId];
      const style = {
        backgroundColor: color
      };

      return <tr key={rowId} style={style}>{cols}</tr>;
    });

    return (
      <div className="b-sheet-page well text-center">
        <h2>Страница эксперимента</h2>
        <table className="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SheetPage;
