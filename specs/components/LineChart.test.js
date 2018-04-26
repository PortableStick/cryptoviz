import React from "react";
import { shallow } from "enzyme";
import LineChart from "../../src/components/LineChart";

describe("<LineChart />", () => {
  const props = {};
  const component = shallow(<LineChart {...props} />);
  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });
});
