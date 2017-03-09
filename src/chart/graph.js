import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, Hint } from 'react-vis';

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
    this.rememberValue = this.rememberValue.bind(this);
    this.forgetValue = this.forgetValue.bind(this);
  }

  rememberValue(value) {
    this.setState({ value });
  }

  forgetValue() {
    this.setState({
      value: null
    });
  }

  getTooltip() {
    return (
      <Hint value={this.state.value}>
        <div className="tooltip">
          {this.state.value.count}
        </div>
      </Hint>
    );
  }

  render() {
    return (
      <XYPlot
        width={this.props.size.width}
        height={this.props.size.height}
        stackBy={'y'}
        xType="ordinal"
        margin={{ top: 40, left: 50 }}
      >
        <HorizontalGridLines />
        {this.props.data.map((item, index) => (
          <VerticalBarSeries
            key={index}
            animation
            color={item.color}
            data={item.data}
            onValueMouseOver={this.rememberValue}
          />
        ))}
        <XAxis orientation="top" />
        <YAxis tickFormat={v => `${v} %`}/>
        {this.state.value
          ? this.getTooltip()
          : null
        }
      </XYPlot>
    );
  }
}

Graph.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }).isRequired,
  data: React.PropTypes.array.isRequired
};

export default Graph;
