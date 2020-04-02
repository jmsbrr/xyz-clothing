import React, { Component } from "react";
import PriceBadge from "./priceBadge";
import ProductListing from "./productListing";
import ActionBar from "./action-bar";

const PageProductDetail = props => {
  window.scrollTo(0, 0);

  const product = props.product;
  let relatedProductsListing = null;

  if (product.relatedProducts.length > 0) {
    const products = props.products.filter(prod => {
      return product.relatedProducts.indexOf(prod.id) !== -1;
    });

    relatedProductsListing = (
      <div>
        <hr className="product-detail__separator" />
        <h2 className="h4">Related Products</h2>
        <ProductListing
          products={products}
          appCurrency={props.appCurrency}
          exchangeRates={props.exchangeRates}
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
          appCurrency={props.appCurrency}
          exchangeRates={props.exchangeRates}
        />
        <p className="product-detail__description">{product.description}</p>
      </div>

      {relatedProductsListing}
    </React.Fragment>
  );
};

export default PageProductDetail;
