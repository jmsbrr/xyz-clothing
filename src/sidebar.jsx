import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="primary-nav">
          <Link to="/" className="primary-nav__link">
            Dashboard
          </Link>
          <Link to="/products" className="primary-nav__link">
            Products
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
