import React, { Component } from "react";
import ProductListing from "./productListing";

class PageProducts extends Component {
  componentDidMount() {
    this.props.resetRedirect();
    window.scrollTo(0, 0);
  }

  render() {
    const { products, appCurrency, exchangeRates } = this.props;

    return (
      <div>
        <h1>Products</h1>
        <ProductListing
          products={products}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
        />
      </div>
    );
  }
}

export default PageProducts;
