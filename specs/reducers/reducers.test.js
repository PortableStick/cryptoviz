import { types } from "../../src/constants";
import {
  initialState,
  rootReducer,
  flagsReducer,
  individualDataReducer
} from "../../src/reducers";

const { root, flags, individualData } = initialState;

const testData = [1, 2, 3, 4];
const testError = "this is an error";

describe("rootReducer", () => {
  it("should return the initial state if nothing is passed", () => {
    expect(rootReducer(undefined, {})).toEqual(root);
  });

  it("should set the currency data when passed the receiveCurrencyData action", () => {
    const testAction = {
      type: types.receiveCurrencyData,
      payload: testData
    };
    const expectedState = {
      ...root,
      currencyData: testData
    };
    expect(rootReducer(root, testAction)).toEqual(expectedState);
  });

  it("should set the error field when passed the handleError action", () => {
    const testAction = {
      type: types.handleError,
      payload: testError
    };
    const expectedState = {
      ...root,
      error: testError
    };

    expect(rootReducer(root, testAction)).toEqual(expectedState);
  });

  it("should reset the error field when passed the clearError action", () => {
    const testState = {
      ...root,
      error: testError
    };
    const testAction = {
      type: types.clearError
    };
    const expectedState = {
      ...root,
      error: null
    };
    expect(rootReducer(testState, testAction)).toEqual(expectedState);
  });
});

describe("flagsReducer", () => {
  it("should return the initial state if nothing is passed", () => {
    expect(flagsReducer(undefined, {})).toEqual(flags);
  });

  it("should set the LOADING flag when passed the loading action", () => {
    const testAction = {
      type: types.loading
    };

    const expectedState = {
      ...flags,
      loading: true
    };
    expect(flagsReducer(flags, testAction)).toEqual(expectedState);
  });

  it("should reset the LOADING flag when passed the receiveCurrencyData action", () => {
    const testState = {
      ...flags,
      loading: true
    };
    const testAction = {
      type: types.receiveCurrencyData,
      payload: []
    };

    expect(flagsReducer(testState, testAction)).toEqual(flags);
  });

  it("should reset the LOADING flag when passed the receiveCurrencyPageData action", () => {
    const testState = {
      ...flags,
      loading: true
    };
    const testAction = {
      type: types.receiveCurrencyPageData,
      payload: []
    };

    expect(flagsReducer(testState, testAction)).toEqual(flags);
  });

  it("should set the ERROR flag when passed the handleError action", () => {
    const testAction = {
      type: types.handleError,
      payload: testError
    };

    const expectedState = {
      ...flags,
      error: true
    };

    expect(flagsReducer(flags, testAction)).toEqual(expectedState);
  });

  it("should reset the flag field when passed the clearError action", () => {
    const testState = {
      ...flags,
      error: true
    };
    const testAction = {
      type: types.clearError
    };

    expect(flagsReducer(testState, testAction)).toEqual(flags);
  });
});

describe("individualDataReducer", () => {
  it("should return the initial state if nothing is passed", () => {
    expect(individualDataReducer(undefined, {})).toEqual(individualData);
  });

  it("should set the data for an individual currency when passed the receiveCurrencyPageData action", () => {
    const testAction = {
      type: types.receiveCurrencyPageData,
      payload: testData
    };
    const expectedState = {
      ...individualData,
      data: testData
    };
    expect(individualDataReducer(individualData, testAction)).toEqual(
      expectedState
    );
  });

  it("should set the error field when passed the handleError action", () => {
    const testAction = {
      type: types.handleError,
      payload: testError
    };
    const expectedState = {
      ...individualData,
      error: testError
    };

    expect(individualDataReducer(individualData, testAction)).toEqual(
      expectedState
    );
  });

  it("should reset the error field when passed the clearError action", () => {
    const testState = {
      ...individualData,
      error: testError
    };
    const testAction = {
      type: types.clearError
    };
    expect(individualDataReducer(testState, testAction)).toEqual(
      individualData
    );
  });
});
