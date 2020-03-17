import React, { Component } from "react";
import { Link } from "react-router-dom";

class ActionBar extends Component {
  render() {
    let links;

    if (this.props.mode === "edit") {
      links = (
        <div>
          <input
            className="btn btn--accent action-bar__btn"
            type="submit"
            value="Save"
          />
          <Link
            className="btn btn--ghost action-bar__btn"
            to={`/products/${this.props.product.id}/`}
          >
            Cancel
          </Link>
        </div>
      );
    } else {
      links = (
        <div>
          <Link
            className="btn btn--ghost action-bar__btn"
            to={`/products/${this.props.product.id}/edit`}
          >
            Edit
          </Link>
        </div>
      );
    }

    return (
      <div className="action-bar">
        <div>
          <Link to="/products" className="action-bar__view-all">
            View All Products
          </Link>
        </div>
        {links}
      </div>
    );
  }
}

export default ActionBar;
