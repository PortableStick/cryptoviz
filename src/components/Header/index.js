import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactAutocomplete from "react-autocomplete";
import CurrencySprite from "../CurrencySprite";
import { connect } from "react-redux";

export class Header extends Component {
  constructor(props) {
    super(props);
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
              <div>
                <Link to={`/${item.short}`}>
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
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ ...state.rootReducer });

export default connect(mapStateToProps)(Header);
