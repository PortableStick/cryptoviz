import React from 'react';
import { shallow, mount } from 'enzyme';
import RankIndicator, { medals } from '../../src/components/RankIndicator';

describe('<RankIndicator />', () => {
  it('should render', () => {
    const props = {
      rank: 0,
    };
    const component = shallow(<RankIndicator {...props} />);
    expect(component.exists()).toEqual(true);
  });

  it('should render a gold circle when rank is 1', () => {
    const props = {
      rank: 1,
    };
    const component = mount(<RankIndicator {...props} />);
    expect(component.find('.circle').prop('style')).toMatchObject(medals.gold);
  });

  it('should render a silver circle when rank is 2', () => {
    const props = {
      rank: 2,
    };
    const component = mount(<RankIndicator {...props} />);
    expect(component.find('.circle').prop('style')).toMatchObject(medals.silver);
  });

  it('should render a bronze circle when rank is 3', () => {
    const props = {
      rank: 3,
    };
    const component = mount(<RankIndicator {...props} />);
    expect(component.find('.circle').prop('style')).toMatchObject(medals.bronze);
  });

  it('should render a standard bordered style for all other ranks', () => {
    const props = {
      rank: 132790923,
    };
    const component = mount(<RankIndicator {...props} />);
    expect(component.find('.circle').prop('style')).toMatchObject(medals.participation);
  });
});
