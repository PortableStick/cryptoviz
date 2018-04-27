import React from "react";
import { shallow } from "enzyme";
import Loader from "../../src/components/Loader";

describe("<Loader />", () => {
  const props = {};
  const component = shallow(<Loader {...props} />);
  it("should render", () => {
    expect(component.exists()).toEqual(true);
  });
});
