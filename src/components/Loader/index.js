import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

function Loader() {
  const style = {
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    padding: "30%"
  };
  return (
    <div style={style} className="has-background-info has-text-white">
      <FontAwesomeIcon pulse icon="spinner" size="9x" />
    </div>
  );
}

export default Loader;
