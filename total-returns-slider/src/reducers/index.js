import { combineReducers } from 'redux';
import { SELECT_YEAR_RANGE, BOUNDARY_OF_YEAR } from '../config.js'

const selectedYearRangeReducer = (yearRange = [0, 0], action) => {
  if(action.type === SELECT_YEAR_RANGE) {
    return action.payload;
  }
  return yearRange;
};

const setBoundaryOfYearReducer = (boundary = {}, action) => {
  if(action.type === BOUNDARY_OF_YEAR) {
    return action.payload;
  }
  //default
  return {
    lowerBound: 1900,
    upperBound: 2100
  }
}

export default combineReducers({
  selectedYearRange: selectedYearRangeReducer,
  boundaryOfYear: setBoundaryOfYearReducer
});