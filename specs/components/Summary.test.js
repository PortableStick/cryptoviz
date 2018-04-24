import React from 'react';
import { shallow } from 'enzyme';
import { Summary } from '../../src/components/Summary';
import { currency } from '../../currency.db.json';

const props = {
  currencyData: currency,
  fetchCurrencyData: jest.fn(),
  loading: false,
};

describe('<Summary />', () => {
  const component = shallow(<Summary {...props} />);

  it('should render', () => {
    expect(component.exists()).toEqual(true);
  });

  it('should render each currency in a list', () => {
    expect(component.find('CurrencyItem').length).toEqual(currency.length);
  });
});
