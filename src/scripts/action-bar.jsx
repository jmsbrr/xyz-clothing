import React from "react";
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

function getCancelLink(id) {
  return id === null ? "/products/" : `/products/${id}/`;
}

const getLinks = ({ mode, formError, product: { id = "" } }) => {
  let links;

  if (mode === "edit") {
    links = (
      <React.Fragment>
        <input
          disabled={formError}
          className="btn btn--accent action-bar__btn form__submit"
          type="submit"
          form="product-edit"
          value="Save"
        />
        <Link className="btn btn--ghost action-bar__btn" to={getCancelLink(id)}>
          Cancel
        </Link>
      </React.Fragment>
    );
  } else {
    links = (
      <Link
        className="btn btn--ghost action-bar__btn"
        to={`/products/${id}/edit`}
      >
        Edit
      </Link>
    );
  }

  return links;
};

export default ActionBar;
