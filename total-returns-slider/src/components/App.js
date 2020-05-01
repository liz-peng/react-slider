import React from 'react';
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import YearRange from '../containers/YearRange';
import SP500DisplayTable from '../containers/SP500DisplayTable';

function App() {
  return (
    <div className="App">
      <YearRange />
      <SP500DisplayTable />
    </div>
  );
}

export default App;
