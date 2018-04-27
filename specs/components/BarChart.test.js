import React from "react";
import { shallow } from "enzyme";
import BarChart from "../../src/components/BarChart";

describe("<BarChart />", () => {
  const props = {
    data: []
  };
  const component = shallow(<BarChart {...props} />);
  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });
});
