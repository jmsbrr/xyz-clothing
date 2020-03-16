import React, { Component } from "react";
import PriceBadge from "./priceBadge";

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
      </div>
    );
  }
}

export default PageProductDetail;
