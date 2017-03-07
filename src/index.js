import Siema from 'siema';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './chart';
import './index.css';

// Init slider
const slider = new Siema({
  selector: '#aplications-slider',
  duration: 200,
  easing: 'ease-out',
  perPage: 3,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: false,
});

document.querySelector('.js-slider-prev').addEventListener('click', () => slider.prev());
document.querySelector('.js-slider-next').addEventListener('click', () => slider.next());

ReactDOM.render(
  <Chart />,
  document.getElementById('chart')
);
