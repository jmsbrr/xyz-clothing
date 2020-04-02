import React from "react";
import { Link } from "react-router-dom";

const PrimaryNav = () => {
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
};

export default PrimaryNav;
