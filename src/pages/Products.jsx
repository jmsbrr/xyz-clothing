import React, { Component } from "react";
import ProductListing from "../components/ProductListing";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";
import Button from "../components/Button";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.itemCount === 0 && prevProps.products.length > 0) {
      this.setState({ itemCount: prevProps.products.length });
    }
  }

  render() {
    const { itemCount, currentPage, pageSize } = this.state;
    const { products, appCurrency, exchangeRates } = this.props;

    // Filter and sort before paginating
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
          <Link to="/products/add">
            <Button label="New Product" element="div" />
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
