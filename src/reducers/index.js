import { types } from "../constants";

export const initialState = {
  root: {
    currencyData: [],
    error: null
  },
  flags: {
    loading: false,
    error: false
  },
  individualData: {
    data: {},
    error: null
  }
};

export function rootReducer(state = initialState.root, action) {
  switch (action.type) {
    case types.handleError:
      return {
        ...state,
        error: action.payload
      };
    case types.receiveCurrencyData:
      return {
        ...state,
        currencyData: action.payload
      };
    case types.clearError:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function flagsReducer(state = initialState.flags, action) {
  switch (action.type) {
    case types.handleError:
      return {
        ...state,
        error: true
      };
    case types.clearError:
      return {
        ...state,
        error: false
      };
    case types.loading:
      return {
        ...state,
        loading: true
      };
    case types.receiveCurrencyData:
      return {
        ...state,
        loading: false
      };
    case types.receiveCurrencyPageData:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function individualDataReducer(
  state = initialState.individualData,
  action
) {
  switch (action.type) {
    case types.handleError:
      return {
        ...state,
        error: action.payload
      };
    case types.clearError:
      return {
        ...state,
        error: null
      };
    case types.receiveCurrencyPageData:
      return {
        ...state,
        data: action.payload
      };
    case types.clearIndividualData:
      return {
        ...state,
        data: initialState.individualData.data
      };
    default:
      return state;
  }
}
