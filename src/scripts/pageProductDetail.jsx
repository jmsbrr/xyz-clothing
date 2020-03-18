import React, { Component } from "react";
import PriceBadge from "./priceBadge";
import ProductListing from "./productListing";
import ActionBar from "./action-bar";

class PageProductDetail extends Component {
  render() {
    const product = this.props.product;
    let relatedProductsListing;

    if (product.relatedProducts.length > 0) {
      const products = this.props.products.filter(prod => {
        return product.relatedProducts.indexOf(prod.id) !== -1;
      });

      relatedProductsListing = (
        <div>
          <hr className="product-detail__separator" />
          <h2 className="h3">Related Products</h2>
          <ProductListing
            products={products}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
          />
        </div>
      );

      window.scrollTo(0, 0);
    }

    return (
      <React.Fragment>
        <div className="product-detail">
          <ActionBar product={product} mode="view" />

          <h1>{product.name}</h1>
          <p>Product ID: {product.id}</p>
          <PriceBadge
            price={product.price}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
          />
          <p>{product.description}</p>
        </div>

        {relatedProductsListing}
      </React.Fragment>
    );
  }
}

export default PageProductDetail;
