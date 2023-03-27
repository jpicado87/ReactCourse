import PropTypes from "prop-types";
import React from "react";

export default function PropsFunctions({ lastName, age }) {
  return (
    <div>
      <p>{lastName}</p>
      <p>{age}</p>
    </div>
  );
}

PropsFunctions.propTypes = {
  lastName: PropTypes.string,
};
