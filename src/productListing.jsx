import React, { Component } from "react";
import ProductCard from "./productCard";

class ProductListing extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.products.map(prod => (
            <ProductCard
              product={prod}
              key={prod.id}
              appCurrency={this.props.appCurrency}
              exchangeRates={this.props.exchangeRates}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductListing;
