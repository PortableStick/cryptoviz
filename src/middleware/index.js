import { types } from "../constants";
import actions from "../actions";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function bindMiddleware(dataService) {
  return function dataMiddleWare(store) {
    return function dataMiddlewareTakesNext(next) {
      return function dataMiddleWareReducer(action) {
        next(action);
        switch (action.type) {
          case types.fetchCurrencyData:
            next(actions.flagLoading());
            return dataService(`${baseUrl}/front`)
              .then(currency => next(actions.receiveCurrencyData(currency)))
              .catch(error => next(actions.handleError(error)));
          case types.fetchCurrencyPageData:
            next(actions.flagLoading());
            return Promise.all([
              dataService(`${baseUrl}/page/${action.payload}`),
              dataService(`${baseUrl}/history/${action.payload}`)
            ])
              .then(data => ({ ...data[0], marketData: data[1] }))
              .then(data => next(actions.receiveCurrencyPageData(data)))
              .catch(error => next(actions.handleError(error)));
          default:
            break;
        }
        return store;
      };
    };
  };
}
