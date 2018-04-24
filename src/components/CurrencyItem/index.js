import React from 'react';
import PropTypes from 'prop-types';

function CurrencyItem(props) {
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.long}</p>
              <p className="subtitle is-6">{props.short}</p>
            </div>
          </div>
          <div className="content">
            ${props.usdVolume}
          </div>
        </div>
      </div>
    </li>
  );
}

CurrencyItem.propTypes = {
  // cap24hrChange: PropTypes.number.isRequired,
  long: PropTypes.string.isRequired,
  // mktcap: PropTypes.number.isRequired,
  // perc: PropTypes.number.isRequired,
  // price: PropTypes.number.isRequired,
  // shapeshift: PropTypes.bool.isRequired,
  short: PropTypes.string.isRequired,
  // supply: PropTypes.number.isRequired,
  usdVolume: PropTypes.number.isRequired,
  // volume: PropTypes.number.isRequired,
  // vwapData: PropTypes.number.isRequired,
  // vwapDataBTC: PropTypes.number.isRequired,
};

export default CurrencyItem;
