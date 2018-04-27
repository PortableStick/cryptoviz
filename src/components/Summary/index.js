import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CurrencyItem from "../CurrencyItem";
import Loader from "../Loader";
import actions from "../../actions";

export class Summary extends Component {
  constructor(props) {
    super(props);
    props.fetchCurrencyData();
  }

  static propTypes = {
    listLength: PropTypes.number,
    currencyData: PropTypes.arrayOf(currencyInfo).isRequired,
    loading: PropTypes.bool.isRequired,
    fetchCurrencyData: PropTypes.func.isRequired
  };
  static defaultProps = {
    listLength: 20
  };

  renderCurrencies() {
    return this.props.currencyData
      .slice(0, this.props.listLength)
      .map((c, i) => (
        <CurrencyItem key={`item-${c.short}`} {...c} rank={i + 1} />
      ));
  }

  render() {
    const { loading } = this.props;

    return (
      <div style={{ height: "50vh", overflowY: "scroll" }}>
        <ul className="currency-list">
          {loading ? <Loader /> : this.renderCurrencies()}
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
  vwapDataBTC: PropTypes.number
});

const mapStateToProps = state => ({
  ...state.rootReducer,
  ...state.flagsReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencyData: () =>
    dispatch(actions.flagLoading()) && dispatch(actions.fetchCurrencyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
