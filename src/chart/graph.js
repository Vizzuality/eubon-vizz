import React from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

function Graph(props) {
  return (
    <XYPlot
      width={400}
      height={250}
      stackBy={'y'}>
      <HorizontalGridLines />
      {props.data.map((data, index) => (
        <VerticalBarSeries
          key={index}
          data={data}/>
      ))}
      <XAxis />
      <YAxis />
    </XYPlot>
  );
}

Graph.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default Graph;
