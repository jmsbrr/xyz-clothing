import React, { Component } from "react";
import PriceBadge from "./priceBadge";
import { Link } from "react-router-dom";
import ProductListing from "./productListing";

class PageProductDetail extends Component {
  render() {
    const product = this.props.product;
    let relatedProductsListing;

    if (product.relatedProducts.length > 0) {
      const products = this.props.products.filter(prod => {
        return product.relatedProducts.indexOf(prod.id) != -1;
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
      <div>
        <div className="product-detail">
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

        {relatedProductsListing}
      </div>
    );
  }
}

export default PageProductDetail;
