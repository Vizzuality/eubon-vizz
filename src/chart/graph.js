import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

function Graph(props) {
  return (
    <XYPlot
      width={props.size.width}
      height={props.size.height}
      stackBy={'y'}
      xType="ordinal"
      margin={{ top: 40 }}
    >
      <HorizontalGridLines />
      {props.data.map((item, index) => (
        <VerticalBarSeries
          key={index}
          animation
          color={item.color}
          data={item.data}
        />
      ))}
      <XAxis orientation="top" />
      <YAxis />
    </XYPlot>
  );
}

Graph.propTypes = {
  size: React.PropTypes.shape({
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }).isRequired,
  data: React.PropTypes.array.isRequired
};

export default Graph;
