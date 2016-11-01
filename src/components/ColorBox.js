import React from 'react';

class ColorBox extends React.Component {
  render() {
    const color = this.props.color;

    return (
      <div className="b-color-box"
        style={{ backgroundColor: color }}
      />
    );
  }
}

export default ColorBox;
