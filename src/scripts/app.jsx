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
  }

  handleCurrencyChange = userSetCurrency => {
    this.setState({ appCurrency: userSetCurrency });
  };

  handleProductUpdate = (
    updatedProductData,
    originalProductId,
    relatedProducts
  ) => {
    let newProductState = [...this.state.products];

    updatedProductData.relatedProducts = relatedProducts;

    // Find product in state.products to update
    const indexToSplice = newProductState.findIndex(
      prod => prod.id === originalProductId
    );

    // The ID of this product has been modified.
    // Let's update other product's references to the old ID
    if (originalProductId !== updatedProductData.id) {
      for (let prod of newProductState) {
        let relatedProducts = prod.relatedProducts;

        if (relatedProducts.includes(originalProductId)) {
          const index = relatedProducts.findIndex(p => p === originalProductId);

          relatedProducts[index] = updatedProductData.id;
        }
      }
    }

    // Update products
    newProductState.splice(indexToSplice, 1, updatedProductData);
    this.setState({ products: [...newProductState], redirect: true });
  };

  resetRedirect = () => {
    this.setState({ redirect: false });
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Sidebar
            exchangeRates={this.state.exchangeRates}
            appCurrency={this.state.appCurrency}
            onCurrencyChange={this.handleCurrencyChange}
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
                  onProductUpdate={this.handleProductUpdate}
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
