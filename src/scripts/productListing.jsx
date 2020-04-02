import React, { Component } from "react";
import ProductCard from "./productCard";

const ProductListing = props => {
  const { products, appCurrency, exchangeRates } = props;

  return (
    <div className="product-listing">
      {products.map(prod => (
        <ProductCard
          product={prod}
          key={prod.id}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
        />
      ))}
    </div>
  );
};

export default ProductListing;
