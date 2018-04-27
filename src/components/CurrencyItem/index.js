import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import RankIndicator from "../RankIndicator";
import CurrencySprite from "../CurrencySprite";
import CapChangeIndicator from "../CapChangeIndicator";

import { formatInteger, formatMoney } from "../../utils";

function CurrencyItem(props) {
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <span className="media">
            <div className="media-left">
              <RankIndicator rank={props.rank} radius={2} />
            </div>
            <div className="media-content">
              <p className="title">
                <CurrencySprite currency={props.long} />
                {props.long}
              </p>
              <p className="subtitle">{props.short}</p>
            </div>
            <div className="media-right">
              <Link to={`/${props.short}`}>Read more</Link>
            </div>
          </span>
          <div className="card-footer">
            <div className="card-footer-item">
              <span className="market-cap">
                Market Cap: ${formatMoney(props.mktcap)}
              </span>
            </div>
            <div className="card-footer-item">
              <span className="usdVolume">
                24 Hour Volume: ${formatInteger(props.usdVolume)}
              </span>
            </div>
            <div className="card-footer-item">
              <span className="24-change">
                24 Hour Change:{" "}
                <CapChangeIndicator capChange={props.cap24hrChange} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

CurrencyItem.propTypes = {
  rank: PropTypes.number.isRequired,
  cap24hrChange: PropTypes.number.isRequired,
  long: PropTypes.string.isRequired,
  mktcap: PropTypes.number.isRequired,
  short: PropTypes.string.isRequired,
  usdVolume: PropTypes.number.isRequired
};

export default CurrencyItem;
