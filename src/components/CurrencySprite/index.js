import React from 'react';
import PropTypes from 'prop-types';

function CurrencySprite({ currency }) {
  const style = {
    display: 'inline-block',
    transform: 'translateY(7px)',
    marginRight: '3px',
  };

  return (
    <span className={`sprite-${currency.toLowerCase()}`} style={style} />
  );
}

CurrencySprite.propTypes = {
  currency: PropTypes.string.isRequired,
};

export default CurrencySprite;
