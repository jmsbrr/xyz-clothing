import React, { Component } from "react";
import { Link } from "react-router-dom";

const ActionBar = props => {
  return (
    <div className="action-bar">
      <div className="action-bar__inner">
        <div>
          <Link to="/products" className="action-bar__view-all">
            View All Products
          </Link>
        </div>
        <div>{getLinks(props)}</div>
      </div>
    </div>
  );
};

const getLinks = props => {
  let links;

  if (props.mode === "edit") {
    links = (
      <React.Fragment>
        <input
          disabled={!props.formValid}
          className="btn btn--accent action-bar__btn form__submit"
          type="submit"
          value="Save"
        />
        <Link
          className="btn btn--ghost action-bar__btn"
          to={`/products/${props.product.id}/`}
        >
          Cancel
        </Link>
      </React.Fragment>
    );
  } else {
    links = (
      <Link
        className="btn btn--ghost action-bar__btn"
        to={`/products/${props.product.id}/edit`}
      >
        Edit
      </Link>
    );
  }

  return links;
};

export default ActionBar;
