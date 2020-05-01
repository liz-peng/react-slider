import { combineReducers } from 'redux';

const selectedYearRangeReducer = (yearRange = [0, 0], action) => {
  if(action.type === 'SELECT_YEAR_RANGE') {
    return action.payload;
  }
  return yearRange;
};

const setBoundaryOfYearReducer = (boundary = {}, action) => {
  if(action.type === 'BOUNDARY_OF_YEAR') {
    console.log('reducer');
    console.log(action.payload);
    return action.payload;
  }
  return {
    lowerBound: 1900,
    upperBound: 2100
  }
}

export default combineReducers({
  selectedYearRange: selectedYearRangeReducer,
  boundaryOfYear: setBoundaryOfYearReducer
});