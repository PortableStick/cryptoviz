import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RankIndicator from '../RankIndicator';
import CurrencySprite from '../CurrencySprite';
import { formatInteger } from '../../utils';

function CurrencyItem(props) {
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">
                <RankIndicator rank={props.rank} radius={1.2} />
                {props.long}
              </p>
              <p className="subtitle is-6">
                <CurrencySprite currency={props.long} />
                {props.short}
              </p>
            </div>
          </div>
          <div className="content">
            <span className="usdVolume">
              ${formatInteger(props.usdVolume)}
            </span>
            <Link to={`/${props.short}`}>
              &nbsp;Read more
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

CurrencyItem.propTypes = {
  rank: PropTypes.number.isRequired,
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
