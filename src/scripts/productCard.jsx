import React from "react";
import { Link } from "react-router-dom";
import PriceBadge from "./priceBadge";

const ProductCard = ({
  product: { id, name, description, price },
  appCurrency,
  exchangeRates
}) => {
  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__top">
        <h2 className="product-card__heading">{name}</h2>
        <div className="product-card__copy">{description}</div>
      </div>

      <div className="product-card__info">
        <PriceBadge
          price={price}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
          className="product-card__price"
        />
        <div className="product-card__id">Product ID: {id}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
