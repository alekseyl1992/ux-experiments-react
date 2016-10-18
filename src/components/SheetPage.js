import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class SheetPage extends React.Component {
  render() {
    return (
      <div className="b-SheetPage well text-center">
        <h2>Экспериментальная страница</h2>
      </div>
    );
  }
}

SheetPage.propTypes = {
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = () => {
  return {};
}

SheetPage = connect(mapStateToProps, mapDispatchToProps)(SheetPage);

export default SheetPage;
