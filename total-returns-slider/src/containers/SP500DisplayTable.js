import React, {Component} from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import history from '../data/history.json';
import { setBoundaryOfYear } from '../actions';
import { applyMiddleware } from 'redux';

class SP500DisplayTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataToDispay: history,
      yearRange: [0, 1]
    }
    this.handleData = this.handleData.bind(this);
  }

  componentWillMount(){
    this.handleData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.yearRange[0] != this.props.yearRange[0]){
      this.setState({
        minYearToDisplay: this.props.yearRange[0],
        maxYearToDisplay: this.props.yearRange[1]
      })
    }
  }

  handleData(){
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

    this.setState({
      minYearToDisplay: min,
      maxYearToDisplay: max
    })

    this.props.setBoundaryOfYear(boundaryOfYear);
  }

  renderList(){
    let cumulative = 0;
    let filteredData = this.state.dataToDispay.filter((row) => {
      return row["year"] >= this.props.yearRange[0] && row["year"] <= this.props.yearRange[1];
    });

    return filteredData.reverse().map((row) => {
      cumulative += parseFloat(row["totalReturn"], 2);
      return (
        <li>{row["year"]}, {row["totalReturn"]}, {cumulative.toFixed(2)}</li>
      );
    }, this).reverse();
  }

  render() {
    return(
      <ul>
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    yearRange: state.selectedYearRange
  }
}

export default connect(mapStateToProps, { setBoundaryOfYear })(SP500DisplayTable);