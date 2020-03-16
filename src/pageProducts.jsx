import React, { Component } from "react";
import ProductListing from "./productListing";

class PageProducts extends Component {
  render() {
    return (
      <div>
        <h1>Products</h1>
        <ProductListing
          products={this.props.products}
          appCurrency={this.props.appCurrency}
          exchangeRates={this.props.exchangeRates}
        />
      </div>
    );
  }
}

export default PageProducts;
