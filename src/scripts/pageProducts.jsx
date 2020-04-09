import React, { Component } from "react";
import ProductListing from "./productListing";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";

class PageProducts extends Component {
  state = {
    itemCount: this.props.products.length,
    currentPage: 1,
    pageSize: 4
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { itemCount, currentPage, pageSize } = this.state;
    const { products, appCurrency, exchangeRates } = this.props;
    const listingItems = paginate(products, currentPage, pageSize);

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
          products={listingItems}
          appCurrency={appCurrency}
          exchangeRates={exchangeRates}
        />
        <Pagination
          itemCount={itemCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default PageProducts;
