import React from 'react';
import { shallow } from 'enzyme';
import { Specialized } from '../../src/components/Specialized';
import { market_cap as marketCap, special } from '../../currency.db.json';

const props = {
  fetchSpecializedData: jest.fn(),
  ...special,
  marketCap,
  loading: false,
  match: {
    params: {
      name: 'BTC',
    },
  },
};

describe('<Specialized />', () => {
  const component = shallow(<Specialized {...props} />);

  it('should render', () => {
    expect(component.exists()).toEqual(true);
  });
});

