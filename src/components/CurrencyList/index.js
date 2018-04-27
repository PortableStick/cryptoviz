import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CurrencyItem from "../CurrencyItem";
import Loader from "../Loader";
import BarChart from "../BarChart";
import actions from "../../actions";

export class CurrencyList extends Component {
  constructor(props) {
    super(props);
    props.fetchCurrencyData();
    this.state = {
      byRank: props.currencyData.slice(0, props.listLength)
    };
  }

  static propTypes = {
    listLength: PropTypes.number,
    currencyData: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    fetchCurrencyData: PropTypes.func.isRequired
  };
  static defaultProps = {
    listLength: 20
  };

  static getDerivedStateFromProps(newProps) {
    return {
      byRank: newProps.currencyData.slice(0, newProps.listLength)
    };
  }

  renderCurrencies() {
    return this.state.byRank.map((c, i) => (
      <CurrencyItem key={`item-${c.short}`} {...c} rank={i + 1} />
    ));
  }

  render() {
    const { loading } = this.props;
    const main = (
      <div>
        {this.state.byRank.length > 0 ? (
          <BarChart data={this.state.byRank} />
        ) : (
          ""
        )}
        <ul
          style={{ height: "50vh", overflowY: "scroll" }}
          className="currency-list"
        >
          {this.renderCurrencies()}
        </ul>
      </div>
    );

    return <Fragment>{loading ? <Loader /> : main}</Fragment>;
  }
}

const mapStateToProps = state => ({
  ...state.rootReducer,
  ...state.flagsReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencyData: () =>
    dispatch(actions.flagLoading()) && dispatch(actions.fetchCurrencyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
