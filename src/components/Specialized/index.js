import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../actions';

export class Specialized extends Component {
  constructor(props) {
    super(props);
    props.fetchSpecializedData(props.match.params.name);
  }

  renderSpecializedData() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {this.props.display_name}
            </h1>
            <h2 className="subtitle">
              {this.props.id}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  render() {
    return (
      <div />
    );
  }
}

Specialized.defaultProps = {
  id: '',
  display_name: '',
};

Specialized.propTypes = {
  // altCap: PropTypes.number,
  // bitnodesCount:PropTypes.number,
  // btcCap: PropTypes.number,
  // btcPrice: PropTypes.number,
  // dom: PropTypes.number,
  // totalCap: PropTypes.number,
  // volumeAlt: PropTypes.number,
  // volumeBtc: PropTypes.number,
  // volumeTotal: PropTypes.number,
  id: PropTypes.string,
  // type: PropTypes.string,
  // _id: PropTypes.string,
  // price_btc: PropTypes.number,
  // price_eth: PropTypes.number,
  // price_ltc: PropTypes.number,
  // price_zec: PropTypes.number,
  // price_eur: PropTypes.number,
  // price_usd: PropTypes.number,
  // market_cap: PropTypes.number,
  // cap24hrChange: PropTypes.number,
  display_name: PropTypes.string,
  // status: PropTypes.string,
  // supply: PropTypes.number,
  // volume: PropTypes.number,
  // price: PropTypes.number,
  // vwap_h24: PropTypes.number,
  // rank: PropTypes.number,
  // alt_name: PropTypes.string,
  fetchSpecializedData: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  ...state.specializedReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchSpecializedData: name => dispatch(actions.fetchSpecializedData(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Specialized);
