import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import LineChart from "../LineChart";
import CapChangeIndicator from "../CapChangeIndicator";
import RankIndicator from "../RankIndicator";
import CurrencySprite from "../CurrencySprite";
import Loader from "../Loader";

import actions from "../../actions";
import { formatInteger, formatMoney } from "../../utils";

export class CurrencyPage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    dom: PropTypes.number,
    id: PropTypes.string,
    price_btc: PropTypes.number,
    price_eth: PropTypes.number,
    price_ltc: PropTypes.number,
    price_zec: PropTypes.number,
    price_eur: PropTypes.number,
    price_usd: PropTypes.number,
    market_cap: PropTypes.number,
    cap24hrChange: PropTypes.number,
    display_name: PropTypes.string,
    supply: PropTypes.number,
    volume: PropTypes.number,
    rank: PropTypes.number,
    marketData: PropTypes.shape({
      market_cap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      price: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      volume: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    }),
    fetchCurrencyPageData: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string
      })
    }).isRequired
  };

  static defaultProps = {
    id: "",
    display_name: "",
    rank: 0,
    price_usd: 0,
    price_btc: 0,
    price_eth: 0,
    price_ltc: 0,
    price_zec: 0,
    price_eur: 0,
    cap24hrChange: 0,
    dom: 0,
    market_cap: 0,
    supply: 0,
    volume: 0,
    marketData: {
      volume: [],
      market_cap: [],
      price: []
    }
  };

  tdStyle = {
    minWidth: "150px"
  };

  constructor(props) {
    super(props);
    props.fetchCurrencyPageData(props.match.params.name);
  }

  renderCurrencyPageData() {
    return (
      <Fragment>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <RankIndicator rank={this.props.rank} radius={2} />
                <span className="c-name">{this.props.display_name}</span>
              </h1>
              <h2
                className="subtitle"
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignContent: "center"
                }}
              >
                <CurrencySprite
                  currency={this.props.display_name}
                  short={this.props.id}
                />
                <CapChangeIndicator capChange={this.props.cap24hrChange} />
              </h2>
            </div>
          </div>
        </section>
        <LineChart data={this.props.marketData.volume} />
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">DOM index</p>
              <p className="title">{this.props.dom}%</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Market Capacity</p>
              <p className="title">${formatMoney(this.props.market_cap)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Total Volume</p>
              <p className="title">${formatMoney(this.props.volume)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Available Supply</p>
              <p className="title">{formatInteger(this.props.supply)}</p>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: "10px" }}>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>
                  <abbr title="U.S. Dollar">
                    <FontAwesomeIcon icon="dollar-sign" size="2x" />
                  </abbr>
                </th>
                <th>
                  <abbr title="Euro">
                    <FontAwesomeIcon icon="euro-sign" size="2x" />
                  </abbr>
                </th>
                <th>
                  <abbr title="Bitcoin">
                    <FontAwesomeIcon icon={["fab", "bitcoin"]} size="2x" />
                  </abbr>
                </th>
                <th>
                  <abbr title="Ethereum">
                    <FontAwesomeIcon icon={["fab", "ethereum"]} size="2x" />
                  </abbr>
                </th>
                <th>
                  <abbr title="Litecoin">
                    <CurrencySprite currency="litecoin" />
                  </abbr>
                </th>
                <th>
                  <abbr title="Z-Cash">
                    <CurrencySprite currency="zcash" />
                  </abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={this.tdStyle}>{this.props.price_usd}</td>
                <td style={this.tdStyle}>{this.props.price_eur}</td>
                <td style={this.tdStyle}>{this.props.price_btc}</td>
                <td style={this.tdStyle}>{this.props.price_eth}</td>
                <td style={this.tdStyle}>{this.props.price_ltc}</td>
                <td style={this.tdStyle}>{this.props.price_zec}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.props.loading ? <Loader /> : this.renderCurrencyPageData()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.individualDataReducer.data,
  ...state.flagsReducer
});

const mapDispatchToProps = dispatch => ({
  fetchCurrencyPageData: name => dispatch(actions.fetchCurrencyPageData(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPage);
