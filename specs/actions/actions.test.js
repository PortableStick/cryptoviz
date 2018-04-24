import { types } from '../../src/constants';
import actions from '../../src/actions';

describe('action creators', () => {
  describe('LOADING', () => {
    it('should create an action that sets loading flag', () => {
      const expectedAction = {
        type: types.loading,
      };
      expect(actions.flagLoading()).toEqual(expectedAction);
    });
  });

  describe('FETCH_CURRENCY_DATA', () => {
    it('should create an action that fetches data', () => {
      const expectedAction = {
        type: types.fetchCurrencyData,
      };
      expect(actions.fetchCurrencyData()).toEqual(expectedAction);
    });
  });

  describe('RECEIVE_CURRENCY_DATA', () => {
    it('should create an action that accepts new data', () => {
      const testData = [
        1, 2, 3, 4,
      ];
      const expectedAction = {
        type: types.receiveCurrencyData,
        payload: testData,
      };

      expect(actions.receiveCurrencyData(testData)).toEqual(expectedAction);
    });
  });

  describe('RECEIVE_SPECIALIZED_DATA', () => {
    it('should create an action that accepts data for a single currency', () => {
      const testData = {
        name: 'Ultracoin',
        value: 100000,
      };
      const expectedAction = {
        type: types.receiveSpecializedData,
        payload: testData,
      };

      expect(actions.receiveSpecializedData(testData)).toEqual(expectedAction);
    });
  });

  describe('RECEIVE_MARKET_DATA', () => {
    it('should create an action that accepts new market data for a currency', () => {
      const testData = [1, 2, 3, 4];
      const expectedAction = {
        type: types.receiveMarketData,
        payload: testData,
      };

      expect(actions.receiveMarketData(testData)).toEqual(expectedAction);
    });
  });

  describe('HANDLE_ERROR', () => {
    it('should create an action that sets the incoming error', () => {
      const error = 'this is an error';
      const expectedAction = {
        type: types.handleError,
        payload: error,
      };

      expect(actions.handleError(error)).toEqual(expectedAction);
    });
  });

  describe('CLEAR_ERROR', () => {
    it('should create an action that clears all error fields', () => {
      const expectedAction = {
        type: types.clearError,
      };

      expect(actions.clearError()).toEqual(expectedAction);
    });
  });
});
