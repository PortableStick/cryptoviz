import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

function Loader() {
  const style = {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    padding: "30%",
    color: "white"
  };
  return (
    <div style={style}>
      <FontAwesomeIcon pulse icon="spinner" size="9x" />
    </div>
  );
}

export default Loader;
