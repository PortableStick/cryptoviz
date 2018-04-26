import React from "react";
import { shallow } from "enzyme";
import CurrencySprite from "../../src/components/CurrencySprite";

const props = {
  currency: "superdogecoin",
  short: "sdc"
};

describe("<CurrencySprite />", () => {
  const component = shallow(<CurrencySprite {...props} />);

  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });

  it("should render a class of sprite-<<currency>>", () => {
    expect(component.find(`.sprite-${props.currency}`).exists()).toEqual(true);
  });
});
