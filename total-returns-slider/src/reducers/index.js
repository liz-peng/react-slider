import { combineReducers } from 'redux';

const selectedYearRangeReducer = (yearRange = [0, 0], action) => {
  if(action.type === 'SELECT_YEAR_RANGE') {
    return action.payload;
  }
  return yearRange;
};

export default combineReducers({
  selectedYearRange: selectedYearRangeReducer,
});