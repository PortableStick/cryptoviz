import React from "react";
import PropTypes from "prop-types";

function CurrencySprite({ currency, short }) {
  const spriteStyle = {
    display: "inline-block",
    marginRight: "3px"
  };

  const nameStyle = {};
  const wrapperStyle = {
    display: "inline-flex",
    justifyContent: "space-between",
    alignContent: "center"
  };
  return (
    <span style={wrapperStyle}>
      <span
        className={`sprite-${currency.toLowerCase()}`}
        style={spriteStyle}
      />
      <span style={nameStyle}>{short}</span>
    </span>
  );
}

CurrencySprite.propTypes = {
  currency: PropTypes.string.isRequired,
  short: PropTypes.string.isRequired
};

export default CurrencySprite;
