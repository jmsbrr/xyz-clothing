import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div class="sidebar">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
      </div>
    );
  }
}

export default Sidebar;
