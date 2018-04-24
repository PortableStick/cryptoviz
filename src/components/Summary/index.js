import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CurrencyItem from '../CurrencyItem';
import actions from '../../actions';

export class Summary extends Component {
  constructor(props) {
    super(props);
    props.fetchCurrencyData();
  }

  renderCurrencies() {
    return this.props.currencyData.map(c => <CurrencyItem key={`item-${c.short}`} {...c} />);
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <ul className="currency-list">
          {loading ? <div>...loading...</div> : this.renderCurrencies()}
        </ul>
      </div>
    );
  }
}

const currencyInfo = PropTypes.shape({
  cap24hrChange: PropTypes.number,
  long: PropTypes.string,
  mktcap: PropTypes.number,
  perc: PropTypes.number,
  price: PropTypes.number,
  shapeshift: PropTypes.bool,
  short: PropTypes.string,
  supply: PropTypes.number,
  usdVolume: PropTypes.number,
  volume: PropTypes.number,
  vwapData: PropTypes.number,
  vwapDataBTC: PropTypes.number,
});

Summary.propTypes = {
  currencyData: PropTypes.arrayOf(currencyInfo).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchCurrencyData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.rootReducer,
  ...state.flagsReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencyData: () => dispatch(actions.flagLoading()) && dispatch(actions.fetchCurrencyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);