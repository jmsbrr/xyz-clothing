import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      exchangeRates: exchangeRates
    };
  }

  handleCurrencyChange = userSetCurrency => {
    this.setState({ appCurrency: userSetCurrency });
  };

  handleProductUpdate = (
    updatedProductData,
    originalProductId,
    relatedProducts,
    history
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
    this.setState({ products: [...newProductState] });

    if (history) history.replace(`/products/${updatedProductData.id}`);
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
