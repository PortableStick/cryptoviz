import { types } from '../constants';

const actions = {
  flagLoading: () => ({ type: types.loading }),
  fetchCurrencyData: () => ({ type: types.fetchCurrencyData }),
  receiveCurrencyData: data => ({ type: types.receiveCurrencyData, payload: data }),
  receiveSpecializedData: data => ({ type: types.receiveSpecializedData, payload: data }),
  receiveMarketData: data => ({ type: types.receiveMarketData, payload: data }),
  handleError: error => ({ type: types.handleError, payload: error }),
  clearError: () => ({ type: types.clearError }),
};

export default actions;
