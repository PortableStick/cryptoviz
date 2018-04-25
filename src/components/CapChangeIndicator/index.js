import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function CapChangeIndicator({ capChange }) {
  let icon = 'minus';
  const styles = {
    color: 'grey',
  };
  switch (true) {
    case capChange > 0:
      styles.color = 'green';
      icon = 'caret-up';
      break;
    case capChange < 0:
      styles.color = 'red';
      icon = 'caret-down';
      break;
    case capChange === 0:
    default:
  }

  return (
    <FontAwesomeIcon icon={icon} style={styles} />
  );
}

CapChangeIndicator.propTypes = {
  capChange: PropTypes.number.isRequired,
};

export default CapChangeIndicator;
