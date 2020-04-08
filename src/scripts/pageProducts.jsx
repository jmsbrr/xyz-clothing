import React, { Component } from "react";
import ProductListing from "./productListing";
import { Link } from "react-router-dom";

class PageProducts extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { products, appCurrency, exchangeRates } = this.props;

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          <h1>Products</h1>
          <Link to="/products/add" className="btn btn--accent">
            New Product
          </Link>
        </div>
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
