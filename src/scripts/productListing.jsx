import React, { Component } from "react";
import ProductCard from "./productCard";

class ProductListing extends Component {
  render() {
    return (
      <div className="product-listing">
        {this.props.products.map(prod => (
          <ProductCard
            product={prod}
            key={prod.id}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
          />
        ))}
      </div>
    );
  }
}

export default ProductListing;
