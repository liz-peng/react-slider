import React, {Component} from 'react';
import '../YearRange.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedYearRange } from '../actions';

class YearRange extends Component {
  constructor(props){
    super(props);
    this.constructMarks = this.constructMarks.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);

    let step = this.props.step || 10;
    let minYear = this.props.minYear || 1970;
    let maxYear = this.props.maxYear || 2020;
    let minOfRange = 0;
    let maxOfRange = (maxYear - minYear) * step;
    let marks = this.constructMarks(minYear, maxYear, step, minOfRange);

    this.state = 
      {
        minYear: minYear,
        maxYear: maxYear,
        minOfRange: minOfRange,
        maxOfRange: maxOfRange,
        step: step,
        marks: marks,
        selectedYearRange: [minOfRange, maxOfRange],
      };
  }

  constructMarks(minYear, maxYear, step, minOfRange){
    let spot = minOfRange;
    let marks = {}
    for(let i = minYear; i <= maxYear; i++){
      if(i <= minYear + 1 || i >= maxYear - 1){
        marks[spot] = i.toString();
      }
      spot += step;
    }

    return marks;
  }

  onHandleChange = (value) => {
    let marks = this.clearPreviousValueInMarks();
    this.updateMarksBySpot(value[0], marks);
    this.updateMarksBySpot(value[1], marks);
    this.setState({
      marks: marks,
      selectedYearRange: value,
    }, () => this.props.selectedYearRange(value));
  }

  clearPreviousValueInMarks(){
    let marks = this.state.marks;
    let step = this.state.step;
    for(let i = this.state.minOfRange + step; i < this.state.maxOfRange; i += step) {
      marks[i] = '';
    }
    return marks;
  }

  updateMarksBySpot(spot, marks){
    let step = this.state.step;
    let currentYear = this.getYearBySpot(spot);
    marks[spot] = currentYear.toString();
    if(spot - step >= this.state.minOfRange) marks[spot - step] = (currentYear - 1).toString();
    if(spot + step <= this.state.maxOfRange) marks[spot + step] = (currentYear + 1).toString();

    return marks;
  }

  getYearBySpot(spot){
    let step = this.state.step;
    return ((spot - this.state.minOfRange) / step) + this.state.minYear;
  }
  

  render(){
    return (
      <div className="YearRange">
      <Range
        dots
        step={this.state.step}
        min={this.state.minOfRange}
        max={this.state.maxOfRange}
        defaultValue={[this.state.minOfRange, this.state.maxOfRange]}
        marks={this.state.marks}
        onChange={this.onHandleChange}
      />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedYearRange: state.selectedYearRange
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      selectedYearRange: selectedYearRange
    },
    dispatch
  );
}

export default connect(mapStateToProps, { selectedYearRange })(YearRange);