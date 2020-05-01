export const selectedYearRange = (range) => {
  return {
    type: 'SELECT_YEAR_RANGE',
    payload: range
  };
};

export const setBoundaryOfYear = (boundary) => {
  return {
    type: 'BOUNDARY_OF_YEAR',
    payload: boundary
  };
};