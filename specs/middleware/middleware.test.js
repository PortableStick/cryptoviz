import bindMiddleware from '../../src/middleware';
import { currency, market_cap as marketCap, special } from '../../currency.db.json';
import actions from '../../src/actions';
import { types } from '../../src/constants';

const fakeStore = jest.fn();
const fakeNext = jest.fn();
const fakeDataFetch = jest.fn((url) => {
  const path = url.split(/https?:\/\/[\w.\d:]+/)[1];
  switch (path) {
    case '/front':
      return Promise.resolve(currency);
    case '/history':
      return Promise.resolve(marketCap);
    case '/page':
      return Promise.resolve(special);
    default:
      return Promise.reject(new Error('This is an error'));
  }
});
const dataService = bindMiddleware(fakeDataFetch)(fakeStore)(fakeNext);

describe('dataService middleware', () => {
  beforeEach(() => {
    fakeStore.mockClear();
    fakeNext.mockClear();
    fakeDataFetch.mockClear();
  });

  it('should always call next with the supplied action', () => {
    const testAction = {
      type: 'anything',
    };
    dataService(testAction);
    expect(fakeNext).toBeCalledWith(testAction);
    expect(fakeDataFetch.mock.calls.length).toEqual(0);
  });

  describe('fetchCurrencyData action', () => {
    const testAction = {
      type: types.fetchCurrencyData,
    };

    it('should call the data service with url \'/front\'', () => {
      dataService(testAction)
        .then(() => {
          expect(fakeDataFetch).toBeCalledWith(expect.stringContaining('/front'));
        });
    });

    it('should resolve to the appropriate data shape when successful', () => {
      const expectedResult = actions.receiveCurrencyData(currency);
      dataService(testAction)
        .then(() => {
          expect(fakeNext).toHaveBeenLastCalledWith(expectedResult);
        });
    });
  });
});
