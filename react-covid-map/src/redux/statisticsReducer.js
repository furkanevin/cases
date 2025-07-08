const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATA_FETCH_PENDING':
      return { ...state, isLoading: true };

    case 'DATA_FETCH_SUCCEEDED':
      return { ...state, isLoading: false, error: null, data: action.payload };

    case 'DATA_FETCH_FAILED':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default statisticsReducer;
