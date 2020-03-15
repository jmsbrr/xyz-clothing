import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const product = this.props.product;
    return (
      <Link to={`/products/${product.id}`} className="product-card">
        <h2 className="product-card__heading">{product.name}</h2>
        <div className="product-card__copy">{product.description}</div>
        <div className="product-card__price">{product.price.amount}</div>
      </Link>
    );
  }
}

export default ProductCard;
