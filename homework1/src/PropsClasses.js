import PropTypes from "prop-types";
import React, { Component } from "react";

export default class PropsClasses extends Component {
  render() {
    return <p>{this.props.lastName}</p>;
  }
}

PropsClasses.propTypes = {
  lastName: PropTypes.string,
};
