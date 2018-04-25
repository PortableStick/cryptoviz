import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

function CapChangeIndicator({ capChange }) {
  let icon = 'minus';
  const styles = {
    color: 'grey',
  };
  switch (true) {
    case capChange > 0:
      styles.color = 'lime';
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
    <Fragment>
      <FontAwesomeIcon icon={icon} style={styles} />
      <span style={{ marginLeft: '3px' }}>{capChange}%</span>
    </Fragment>
  );
}

CapChangeIndicator.propTypes = {
  capChange: PropTypes.number.isRequired,
};

export default CapChangeIndicator;
