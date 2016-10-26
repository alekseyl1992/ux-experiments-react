import React, { PropTypes } from 'react';

class BasePage extends React.Component {
  render() {
    return (
      <div className="b-container">
        <div className="container-fluid">
          <h1>Базовая страница</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

BasePage.defaultProps = {
};

export default BasePage;
