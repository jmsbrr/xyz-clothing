import React, { Component } from "react";
import { Link } from "react-router-dom";

class PrimaryNav extends Component {
  render() {
    return (
      <div className="primary-nav">
        <Link to="/" className="primary-nav__link">
          Dashboard
        </Link>
        <Link to="/products" className="primary-nav__link">
          Products
        </Link>
      </div>
    );
  }
}

export default PrimaryNav;
