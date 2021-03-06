import React from "react";
import { shallow } from "enzyme";
import { CurrencyList } from "../../src/components/CurrencyList";
import { currency } from "../../currency.db.json";

const props = {
  currencyData: currency,
  fetchCurrencyData: jest.fn(),
  loading: false
};

describe("<CurrencyList />", () => {
  const component = shallow(<CurrencyList {...props} />);

  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });

  it("should render each currency in a list", () => {
    expect(component.find("CurrencyItem").length).toEqual(currency.length);
  });

  it("should not render more than 20 currencies by default", () => {
    const propsWithLongList = {
      ...props,
      currencyData: [...currency, ...currency, ...currency]
    };

    const longList = shallow(<CurrencyList {...propsWithLongList} />);
    expect(longList.find("CurrencyItem").length).toEqual(20);
  });
});
