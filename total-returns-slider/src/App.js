import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import YearRange from './YearRange';

function App() {
  return (
    <div className="App">
      <YearRange />
    </div>
  );
}

export default App;
