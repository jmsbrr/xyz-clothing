import React, { Component } from "react";

class ProductCard extends Component {
  render() {
    const product = this.props.product;
    return (
      <div className="product-card">
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price.amount}</div>
      </div>
    );
  }
}

export default ProductCard;
