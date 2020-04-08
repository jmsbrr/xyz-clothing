import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import PageProductDetail from "./pageProductDetail";
import PageProductEdit from "./pageProductEdit";
import PageProductAdd from "./pageProductAdd";
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
      exchangeRates: exchangeRates
    };
  }

  handleCurrencyChange = userSetCurrency => {
    this.setState({ appCurrency: userSetCurrency });
  };

  handleProductUpdate = (updatedProduct, originalId, history) => {
    let products = [...this.state.products];
    let indexToSplice;

    // This is a new product, assign it a new index.
    if (originalId === null) {
      indexToSplice = products.length + 1;
    } else {
      // Find this existing products index in state.products.
      indexToSplice = products.findIndex(prod => prod.id === originalId);
    }

    // The ID for this updated product has been modified.
    // We need to update references to the old ID.
    if (originalId !== null && originalId !== updatedProduct.id) {
      this.updateRelatedProducts(products, updatedProduct, originalId);
    }

    products.splice(indexToSplice, 1, updatedProduct);
    this.setState({ products: [...products] });

    if (history) history.replace(`/products/${updatedProduct.id}`);
  };

  updateRelatedProducts(products, updatedProduct, originalId) {
    for (let prod of products) {
      const relatedProducts = prod.relatedProducts;
      const index = relatedProducts.indexOf(originalId);

      if (index > -1) {
        relatedProducts[index] = updatedProduct.id;
      }
    }
  }

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
            <Switch>
              <Route
                path="/products/:id/edit"
                render={({ match, location, history }) => (
                  <PageProductEdit
                    products={this.state.products}
                    product={this.state.products.find(
                      prod => prod.id.toString() === match.params.id
                    )}
                    onProductUpdate={this.handleProductUpdate}
                    exchangeRates={this.state.exchangeRates}
                    history={history}
                  />
                )}
              ></Route>
              <Route
                path="/products/add"
                render={({ match, location, history }) => (
                  <PageProductAdd
                    products={this.state.products}
                    onProductUpdate={this.handleProductUpdate}
                    exchangeRates={this.state.exchangeRates}
                    history={history}
                  />
                )}
              ></Route>
              <Route
                path="/products/:id"
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
              <Route path="/products">
                <PageProducts
                  appCurrency={this.state.appCurrency}
                  exchangeRates={this.state.exchangeRates}
                  products={this.state.products}
                />
              </Route>
              <Route path="/">
                <PageDashboard />
              </Route>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
