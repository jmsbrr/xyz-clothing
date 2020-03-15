import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const product = this.props.product;
    return (
      <Link to={`/products/${product.id}`} className="product-card">
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price.amount}</div>
      </Link>
    );
  }
}

export default ProductCard;
