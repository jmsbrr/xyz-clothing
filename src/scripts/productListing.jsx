import React from "react";
import ProductCard from "./productCard";

const ProductListing = ({ products, appCurrency, exchangeRates }) => {
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
