import React, { Component } from "react";
import PriceBadge from "./priceBadge";
import ProductListing from "./productListing";
import ActionBar from "./action-bar";

class PageProductDetail extends Component {
  render() {
    window.scrollTo(0, 0);

    const product = this.props.product;
    let relatedProductsListing;

    if (product.relatedProducts.length > 0) {
      const products = this.props.products.filter(prod => {
        return product.relatedProducts.indexOf(prod.id) !== -1;
      });

      relatedProductsListing = (
        <div>
          <hr className="product-detail__separator" />
          <h2 className="h4">Related Products</h2>
          <ProductListing
            products={products}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="product-detail">
          <ActionBar product={product} mode="view" />

          <h1 className="product-detail__heading">{product.name}</h1>
          <p className="product-detail__id">Product ID: {product.id}</p>
          <PriceBadge
            className="product-detail__price"
            price={product.price}
            appCurrency={this.props.appCurrency}
            exchangeRates={this.props.exchangeRates}
          />
          <p className="product-detail__description">{product.description}</p>
        </div>

        {relatedProductsListing}
      </React.Fragment>
    );
  }
}

export default PageProductDetail;
