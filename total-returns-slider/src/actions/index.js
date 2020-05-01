export const selectedYearRange = (range) => {
  return {
    type: 'SELECT_YEAR_RANGE',
    payload: range
  };
};