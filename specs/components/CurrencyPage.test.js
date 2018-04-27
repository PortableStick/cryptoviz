import React from "react";
import { shallow } from "enzyme";
import { CurrencyPage } from "../../src/components/CurrencyPage";
import { market_cap as marketCap, special } from "../../currency.db.json";

const props = {
  fetchCurrencyPageData: jest.fn(),
  ...special,
  marketCap,
  loading: false,
  match: {
    params: {
      name: "BTC"
    }
  }
};

describe("<CurrencyPage />", () => {
  const component = shallow(<CurrencyPage {...props} />);

  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });
});
