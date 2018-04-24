import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../src/components/Main';

describe('<Main />', () => {
  const component = shallow(<Main />);

  it('should render', () => {
    expect(component.exists()).toEqual(true);
  });
});


