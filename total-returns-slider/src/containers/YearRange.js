import React, {Component} from 'react';
import '../YearRange.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedYearRange } from '../actions';
import { Grid } from 'semantic-ui-react'

class YearRange extends Component {
  
  constructor(props){
    super(props);
    this.constructMarks = this.constructMarks.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.step = 1;
    this.minOfRange = 0;

    let minYear = this.props.boundaryOfYear["lowerBound"];
    let maxYear = this.props.boundaryOfYear["upperBound"];
    let maxOfRange = (maxYear - minYear) * this.step;
    let marks = this.constructMarks(minYear, maxYear);

    this.state = 
      {
        minYear: minYear,
        maxYear: maxYear,
        maxOfRange: maxOfRange,
        marks: marks,
        selectedYearRange: [this.minOfRange, maxOfRange],
        isDataImported: false,
      };
  }

  componentDidUpdate(prevProps){
    if(!this.state.isDataImported) {
      this.updateYearBoundary();
    }
  }

  updateYearBoundary(){
    let minYear = this.props.boundaryOfYear["lowerBound"];
    let maxYear = this.props.boundaryOfYear["upperBound"];

    let marks = this.constructMarks(minYear, maxYear);
    let maxOfRange = (maxYear - minYear) / this.step + this.minOfRange;
    this.setState({
      marks: marks,
      minYear: minYear,
      maxYear: maxYear,
      maxOfRange: maxOfRange,
      isDataImported: true
    })
  }

  constructMarks(minYear, maxYear){
    let spot = this.minOfRange;
    let marks = {}
    for(let i = minYear; i <= maxYear; i++){
      if(i < minYear + 1 || i > maxYear - 1){
        marks[spot] = i.toString();
      }
      spot += this.step;
    }

    return marks;
  }

  onHandleChange = (value) => {
    let marks = this.clearPreviousValueInMarks();

    this.updateMarksBySpot(value[0], marks);
    this.updateMarksBySpot(value[1], marks);

    let nextSelectedYearRange = this.getYearValueBySpot(value);

    this.setState({
      marks: marks,
      selectedYearRange: nextSelectedYearRange,
    }, () => this.props.selectedYearRange(nextSelectedYearRange));
  }

  clearPreviousValueInMarks(){
    let marks = this.state.marks;
    for(let k in marks){
      if(k != this.minOfRange && k != this.state.maxOfRange) {
        delete marks[k];
      }
    }
    return marks;
  }

  updateMarksBySpot(spot, marks){
    let currentYear = this.getYearBySpot(spot);
    marks[spot] = currentYear.toString();
    return marks;
  }

  getYearValueBySpot(value){
    return value.map(v => this.getYearBySpot(v))
  }

  getYearBySpot(spot){
    return ((spot - this.minOfRange) / this.step) + this.state.minYear;
  }

  render(){
    return (
      <div className="YearRange">
        <Range
          min={this.minOfRange}
          max={this.state.maxOfRange}
          defaultValue={[this.minOfRange, this.state.maxOfRange]}
          marks={this.state.marks}
          onChange={this.onHandleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    boundaryOfYear: state.boundaryOfYear
  };
}

export default connect(mapStateToProps, { selectedYearRange })(YearRange);