import { types } from "../constants";

const actions = {
  flagLoading: () => ({ type: types.loading }),
  fetchCurrencyData: () => ({ type: types.fetchCurrencyData }),
  receiveCurrencyData: data => ({
    type: types.receiveCurrencyData,
    payload: data
  }),
  fetchCurrencyPageData: data => ({
    type: types.fetchCurrencyPageData,
    payload: data
  }),
  receiveCurrencyPageData: data => ({
    type: types.receiveCurrencyPageData,
    payload: data
  }),
  fetchMarketData: () => ({ type: types.fetchMarketData }),
  receiveMarketData: data => ({ type: types.receiveMarketData, payload: data }),
  handleError: error => ({ type: types.handleError, payload: error }),
  clearError: () => ({ type: types.clearError })
};

export default actions;
