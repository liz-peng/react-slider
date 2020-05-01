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

    let step = this.props.step || 1;
    let minYear = this.props.boundaryOfYear["lowerBound"] || 1000;
    let maxYear = this.props.boundaryOfYear["upperBound"] || 3000;
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

    let marks = this.constructMarks(minYear, maxYear, 1, 0);
    let maxOfRange = (maxYear - minYear) / 1 + 0;
    this.setState({
      marks: marks,
      minYear: minYear,
      maxYear: maxYear,
      maxOfRange: maxOfRange,
      isDataImported: true
    })
  }

  constructMarks(minYear, maxYear, step, minOfRange){
    let spot = minOfRange;
    let marks = {}
    for(let i = minYear; i <= maxYear; i++){
      if(i < minYear + 1 || i > maxYear - 1){
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
    let nextSelectedYearRange = this.getYearValueBySpot(value);
    this.setState({
      marks: marks,
      selectedYearRange: nextSelectedYearRange,
    }, () => this.props.selectedYearRange(nextSelectedYearRange));
  }

  clearPreviousValueInMarks(){
    let marks = this.state.marks;
    let step = this.state.step;
    for(let k in marks){
      if(k != this.state.minOfRange && k != this.state.maxOfRange) {
        delete marks[k];
      }
    }
    return marks;
  }

  updateMarksBySpot(spot, marks){
    let step = this.state.step;
    let currentYear = this.getYearBySpot(spot);
    marks[spot] = currentYear.toString();
    // if(spot - step >= this.state.minOfRange) marks[spot - step] = (currentYear - 1).toString();
    // if(spot + step <= this.state.maxOfRange) marks[spot + step] = (currentYear + 1).toString();
    return marks;
  }

  getYearValueBySpot(value){
    return value.map(v => this.getYearBySpot(v))
  }

  getYearBySpot(spot){
    let step = this.state.step;
    return ((spot - this.state.minOfRange) / step) + this.state.minYear;
  }
 
  render(){
    return (
      <div className="YearRange">
      <Range
        // dots={false}
        // step={this.state.step}
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
  console.log('state');
  console.log(state.boundaryOfYear);
  return {
    // selectedYearRange: state.selectedYearRange
    boundaryOfYear: state.boundaryOfYear
  };
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators(
//     {
//       selectedYearRange: selectedYearRange
//     },
//     dispatch
//   );
// }

export default connect(mapStateToProps, { selectedYearRange })(YearRange);