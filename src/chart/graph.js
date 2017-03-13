import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, LineSeries, Hint } from 'react-vis';

const CHART_MARGINS = { top: 40, right: 0, bottom: 80, left: 50 };

function getAlignStyle(align, x, y) {
  return {
    left: x + 8,
    bottom: -20
  };
}

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
    const { value } = this.state;
    return ([
      <LineSeries
        key={1}
        data={[{x: value.x, y: (-100 + value.y - 1)}, {x: value.x, y: -100}]}
        stroke={value.color}
        strokeWidth={2}
      />,
      <Hint key={2} value={this.state.value} getAlignStyle={getAlignStyle}>
        <div className={`tooltip -${value.image}`} style={{ color: value.color }}></div>
      </Hint>
    ]);
  }

  render() {
    return (
      <XYPlot
        width={this.props.size.width}
        height={this.props.size.height}
        stackBy={'y'}
        xType="ordinal"
        margin={CHART_MARGINS}
      >
        <HorizontalGridLines />
        {this.props.data.map((item, index) => (
          <VerticalBarSeries
            key={index}
            animation
            color={item.color}
            data={item.data}
            onValueMouseOut={this.forgetValue}
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
