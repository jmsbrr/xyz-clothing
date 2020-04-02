import React, { Component } from "react";
import { Link } from "react-router-dom";

class ActionBar extends Component {
  render() {
    return (
      <div className="action-bar">
        <div className="action-bar__inner">
          <div>
            <Link to="/products" className="action-bar__view-all">
              View All Products
            </Link>
          </div>
          <div>{this.getLinks()}</div>
        </div>
      </div>
    );
  }

  getLinks() {
    let links;

    if (this.props.mode === "edit") {
      links = (
        <React.Fragment>
          <input
            disabled={!this.props.formValid}
            className="btn btn--accent action-bar__btn form__submit"
            type="submit"
            value="Save"
          />
          <Link
            className="btn btn--ghost action-bar__btn"
            to={`/products/${this.props.product.id}/`}
          >
            Cancel
          </Link>
        </React.Fragment>
      );
    } else {
      links = (
        <Link
          className="btn btn--ghost action-bar__btn"
          to={`/products/${this.props.product.id}/edit`}
        >
          Edit
        </Link>
      );
    }

    return links;
  }
}

export default ActionBar;
