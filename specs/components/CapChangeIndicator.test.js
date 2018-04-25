import React from 'react';
import { shallow, mount } from 'enzyme';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CapChangeIndicator from '../../src/components/CapChangeIndicator';


describe('<CapChangeIndicator />', () => {
  it('should render', () => {
    const props = {
      capChange: 0,
    };
    const component = shallow(<CapChangeIndicator {...props} />);
    expect(component.exists()).toEqual(true);
  });

  it('should render a lime-green upward triangle when given a positive value', () => {
    const props = {
      capChange: 1,
    };
    const component = mount(<CapChangeIndicator {...props} />);
    expect(component.contains(<FontAwesomeIcon icon="caret-up" style={{ color: 'lime' }} />)).toEqual(true);
  });

  it('should render a red downward triangle when given a negative value', () => {
    const props = {
      capChange: -1,
    };
    const component = mount(<CapChangeIndicator {...props} />);
    expect(component.contains(<FontAwesomeIcon icon="caret-down" style={{ color: 'red' }} />)).toEqual(true);
  });

  it('should render a grey dash when given a value of 0', () => {
    const props = {
      capChange: 0,
    };
    const component = mount(<CapChangeIndicator {...props} />);
    expect(component.contains(<FontAwesomeIcon icon="minus" style={{ color: 'grey' }} />)).toEqual(true);
  });
});
