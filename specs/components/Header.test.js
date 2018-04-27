import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../src/components/Header";

describe("<Header />", () => {
  it("should render", () => {
    const props = {
      currencyData: []
    };
    const component = shallow(<Header {...props} />);
    expect(component.exists()).toEqual(true);
  });
});
