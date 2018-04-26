import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

function CapChangeIndicator({ capChange }) {
  let icon = "minus";
  const wrapperStyle = {
    display: "inline-flex",
    justifyContent: "space-around",
    alignContent: "center",
    margin: "0 10px"
  };
  const iconStyle = {
    color: "grey"
  };
  switch (true) {
    case capChange > 0:
      iconStyle.color = "lime";
      icon = "caret-up";
      break;
    case capChange < 0:
      iconStyle.color = "red";
      icon = "caret-down";
      break;
    case capChange === 0:
    default:
  }

  return (
    <span style={wrapperStyle}>
      <FontAwesomeIcon icon={icon} style={iconStyle} />
      <span style={{ marginLeft: "3px" }}>{capChange}%</span>
    </span>
  );
}

CapChangeIndicator.propTypes = {
  capChange: PropTypes.number.isRequired
};

export default CapChangeIndicator;
