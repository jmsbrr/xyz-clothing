import React, { Component } from "react";
import { Link } from "react-router-dom";
import PriceBadge from "./priceBadge";

class ProductCard extends Component {
  render() {
    const product = this.props.product;

    return (
      <Link to={`/products/${product.id}`} className="product-card">
        <div className="product-card__top">
          <h2 className="product-card__heading">{product.name}</h2>
          <div className="product-card__copy">{product.description}</div>
        </div>
        <div className="product-card__info">
          <PriceBadge
            price={product.price}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
            className="product-card__price"
          />
          <div className="product-card__id">Product ID: {product.id}</div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
