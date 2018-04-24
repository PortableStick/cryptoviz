import React from 'react';
import { shallow } from 'enzyme';
import CurrencyItem from '../../src/components/CurrencyItem';

const props =
    {
      cap24hrChange: 3.8,
      long: 'Bitcoin',
      mktcap: 155456934730.3,
      perc: 3.8,
      price: 9146.9,
      shapeshift: true,
      short: 'BTC',
      supply: 16995587,
      usdVolume: 7508110000,
      volume: 7508110000,
      vwapData: 8898.069574442592,
      vwapDataBTC: 8898.069574442592,
    };

describe('<CurrencyItem />', () => {
  const component = shallow(<CurrencyItem {...props} />);

  it('should render', () => {
    expect(component.exists()).toEqual(true);
  });
});
