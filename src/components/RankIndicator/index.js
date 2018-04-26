import React from "react";
import PropTypes from "prop-types";

export const medals = {
  gold: {
    backgroundColor: "#e4f111",
    color: "white"
  },
  silver: {
    backgroundColor: "#dedede",
    color: "white"
  },
  bronze: {
    backgroundColor: "rgb(219, 190, 86)",
    color: "white"
  },
  participation: {
    border: "1px solid black",
    color: "black",
    backgroundColor: "white"
  }
};

function RankIndicator({ rank, radius }) {
  let style = {
    display: "inline-flex",
    justifyContent: "center",
    alignContent: "center",
    padding: "0",
    margin: 0,
    marginRight: "10px",
    lineHeight: 1,
    borderRadius: "50%",
    width: `${radius}rem`,
    height: `${radius}rem`
  };

  switch (rank) {
    case 1:
      style = { ...style, ...medals.gold };
      break;
    case 2:
      style = { ...style, ...medals.silver };
      break;
    case 3:
      style = { ...style, ...medals.bronze };
      break;
    default:
      style = { ...style, ...medals.participation };
  }

  return (
    <span className="circle" style={style}>
      <span
        className="rank"
        style={{ textShadow: "#333 0 0 1px", fontSize: `${radius}rem` }}
      >
        {rank}
      </span>
    </span>
  );
}

RankIndicator.defaultProps = {
  radius: 1
};

RankIndicator.propTypes = {
  rank: PropTypes.number.isRequired,
  radius: PropTypes.number
};

export default RankIndicator;
