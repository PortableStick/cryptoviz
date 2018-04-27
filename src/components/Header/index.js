import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactAutocomplete from "react-autocomplete";

import CurrencySprite from "../CurrencySprite";
import { connect } from "react-redux";
import actions from "../../actions";

export class Header extends Component {
  static propTypes = {
    fetchCurrencyData: PropTypes.func.isRequired,
    currencyData: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    if (!props.loading && props.currencyData.length === 0) {
      props.fetchCurrencyData();
    }
    this.state = {
      filter: ""
    };
  }

  render() {
    return (
      <nav
        className="navbar is-warning"
        aria-label="main navigation"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item home-link has-text-dark is-size-1-desktop is-size-3-tablet is-uppercase has-text-weight-semibold"
            to="/"
          >
            CryptoViz
          </Link>
        </div>
        <div className="navbar-item">
          <ReactAutocomplete
            items={this.props.currencyData}
            renderItem={(item, isHighlited) => (
              <div key={`${item.short}--`}>
                <Link
                  to={{ pathname: `/${item.short}`, state: { search: true } }}
                >
                  <CurrencySprite currency={item.long} /> {item.long}
                </Link>
              </div>
            )}
            shouldItemRender={(item, value) =>
              item.long.toLowerCase().includes(value.toLowerCase())
            }
            value={this.state.filter}
            getItemValue={d => d.long}
            onChange={e => this.setState({ filter: e.target.value })}
            renderMenu={function(items, value, style) {
              return (
                <div
                  style={{ ...style, ...this.menuStyle }}
                  children={items.slice(0, 3)}
                />
              );
            }}
            inputProps={{
              placeholder: "search for a coin"
            }}
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  ...state.rootReducer,
  ...state.flagsReducer
});
const mapDispatchToProps = dispatch => ({
  fetchCurrencyData: () => dispatch(actions.fetchCurrencyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
