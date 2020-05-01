import React, {Component} from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import history from '../data/history.json';
import { setBoundaryOfYear } from '../actions';

class SP500DisplayTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
    this.handleCsvData = this.handleCsvData.bind(this);
  }

  componentWillMount(){
    this.handleCsvData();
  }

  handleCsvData(){
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    history.forEach(row => {
      max = Math.max(max, row['year']);
      min = Math.min(min, row['year']);
    })

    let boundaryOfYear = {
      lowerBound: min,
      upperBound: max
    }

    this.props.setBoundaryOfYear(boundaryOfYear);
  }

  render() {
    return(
      <div>
        <text>
          {this.props.yearRange[0]}
        </text>
        <text>
          {this.props.yearRange[1]}
        </text>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    yearRange: state.selectedYearRange
  }
}

export default connect(mapStateToProps, { setBoundaryOfYear })(SP500DisplayTable);