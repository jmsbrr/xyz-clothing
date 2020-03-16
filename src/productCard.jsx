import React, { Component } from "react";
import { Link } from "react-router-dom";
import PriceBadge from "./priceBadge";

class ProductCard extends Component {
  render() {
    const product = this.props.product;

    return (
      <Link to={`/products/${product.id}`} className="product-card">
        <h2 className="product-card__heading">{product.name}</h2>
        <div className="product-card__copy">{product.description}</div>
        <PriceBadge
          price={product.price}
          appCurrency={this.props.appCurrency}
          exchangeRates={this.props.exchangeRates}
          className="product-card__price"
        />
      </Link>
    );
  }
}

export default ProductCard;
