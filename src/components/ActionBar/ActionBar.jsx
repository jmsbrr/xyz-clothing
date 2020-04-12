import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import "./styles.scss";

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
        <Button
          label="Save"
          modifier="button--accent action-bar__btn"
          config={{ type: "submit", form: "product-edit" }}
        />

        <Link to={getCancelLink(id)}>
          <Button
            label="Cancel"
            modifier="button--ghost-white action-bar__btn"
            element="div"
          />
        </Link>
      </React.Fragment>
    );
  } else {
    links = (
      <Link to={`/products/${id}/edit`}>
        <Button
          label="Edit"
          modifier="button--ghost-white action-bar__btn"
          element="span"
        />
      </Link>
    );
  }

  return links;
};

export default ActionBar;
