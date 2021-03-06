import React from "react";
import PriceBadge from "../../components/PriceBadge";
import ProductListing from "../../components/ProductListing";
import ActionBar from "../../components/ActionBar";
import Skeleton from "../../components/Skeleton";
import "./styles.scss";

const PageProductDetail = ({
  products,
  product = {},
  product: { relatedProducts = [], name, id, price = {}, description } = {},
  appCurrency,
  exchangeRates
}) => {
  window.scrollTo(0, 0);

  let relatedProductsListing = null;

  // Build related products data from related products IDs
  if (relatedProducts.length > 0) {
    const relatedProductsData = products.filter(prod => {
      return relatedProducts.indexOf(prod.id) !== -1;
    });

    relatedProductsListing = (
      <div>
        <hr className="product-detail__separator" />
        <h2 className="h4">Related Products</h2>
        <ProductListing
          products={relatedProductsData}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
        />
      </div>
    );
  }

  if (product.id === undefined) {
    return (
      <div className="product-detail">
        <Skeleton />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="product-detail">
        <ActionBar product={product} mode="view" />

        <h1 className="product-detail__heading">{name}</h1>
        <p className="product-detail__id">Product ID: {id}</p>
        <PriceBadge
          className="product-detail__price"
          price={price}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
        />
        <p className="product-detail__description">{description}</p>
      </div>

      {relatedProductsListing}
    </React.Fragment>
  );
};

export default PageProductDetail;
