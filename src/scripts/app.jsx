import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import PageProductDetail from "./pageProductDetail";
import PageProductEdit from "./pageProductEdit";
import Sidebar from "./sidebar";
import productsData from "../data/products.json";
import exchangeRates from "../data/exchange_rates.json";
import "../styles/app.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appCurrency: "AUD",
      products: productsData,
      exchangeRates: exchangeRates,
      redirect: false
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleProductUpdate = this.handleProductUpdate.bind(this);
    this.resetRedirect = this.resetRedirect.bind(this);
  }

  handleCurrencyChange(userSetCurrency) {
    this.setState({ appCurrency: userSetCurrency });
  }

  handleProductUpdate(updatedProductData, originalProductId, relatedProducts) {
    let productStateCopy = this.state.products;
    let updatedProduct = updatedProductData;

    // Build the relatedIds array
    let relatedIds = [];
    relatedProducts.forEach(prod => {
      relatedIds.push(prod.id);
    });

    updatedProduct.relatedProducts = relatedIds;

    // Find product in state.products to update
    const indexToSplice = productStateCopy.findIndex(
      prod => prod.id === originalProductId
    );

    // Product ID has changed. Update relatedProducts array for other products.
    if (originalProductId !== updatedProductData.id) {
      productStateCopy.forEach(prod => {
        if (prod.relatedProducts.includes(originalProductId)) {
          const index = prod.relatedProducts.findIndex(
            p => p === originalProductId
          );

          prod.relatedProducts[index] = updatedProductData.id;
        }
      });
    }

    // Update products
    productStateCopy.splice(indexToSplice, 1, updatedProduct);
    this.setState({ ...productStateCopy, redirect: true });
  }

  resetRedirect() {
    this.setState({ redirect: false });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Sidebar
            exchangeRates={this.state.exchangeRates}
            appCurrency={this.state.appCurrency}
            handleCurrencyChange={value => this.handleCurrencyChange(value)}
          />

          <div className="main">
            <Route path="/" exact>
              <PageDashboard />
            </Route>

            <Route path="/products" exact>
              <PageProducts
                appCurrency={this.state.appCurrency}
                exchangeRates={this.state.exchangeRates}
                products={this.state.products}
                resetRedirect={this.resetRedirect}
              />
            </Route>

            <Route
              path="/products/:id"
              exact
              render={({ match }) => (
                <PageProductDetail
                  appCurrency={this.state.appCurrency}
                  exchangeRates={this.state.exchangeRates}
                  products={this.state.products}
                  product={this.state.products.find(
                    prod => prod.id.toString() === match.params.id
                  )}
                />
              )}
            ></Route>

            <Route
              path="/products/:id/edit"
              render={({ match }) => (
                <PageProductEdit
                  products={this.state.products}
                  product={this.state.products.find(
                    prod => prod.id.toString() === match.params.id
                  )}
                  handleProductUpdate={(
                    updatedProductData,
                    originalId,
                    relatedProducts
                  ) =>
                    this.handleProductUpdate(
                      updatedProductData,
                      originalId,
                      relatedProducts
                    )
                  }
                  exchangeRates={this.state.exchangeRates}
                  redirect={this.state.redirect}
                />
              )}
            ></Route>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
