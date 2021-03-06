import React from 'react';

class BasePage extends React.Component {
  render() {
    return (
      <div className="b-container">
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BasePage;
