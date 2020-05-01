import React, {Component} from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';

class SP500DisplayTable extends Component {
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

export default connect(mapStateToProps)(SP500DisplayTable);