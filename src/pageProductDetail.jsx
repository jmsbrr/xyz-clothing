import React, { Component } from "react";
import PriceBadge from "./priceBadge";
import { Link } from "react-router-dom";

class PageProductDetail extends Component {
  render() {
    const product = this.props.product;

    return (
      <div className="product">
        <h1>{product.name}</h1>
        <p>Product ID: {product.id}</p>
        <PriceBadge
          price={product.price}
          appCurrency={this.props.appCurrency}
          exchangeRates={this.props.exchangeRates}
        />
        <p>{product.description}</p>
        <Link to={`/products/${product.id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default PageProductDetail;
