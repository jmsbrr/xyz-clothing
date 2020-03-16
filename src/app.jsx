import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import PageProductDetail from "./pageProductDetail";
import Sidebar from "./sidebar";
import productsData from "./products.json";
import exchangeRates from "./exchange_rates.json";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appCurrency: "AUD"
    };
    this.state.products = productsData;
    this.state.exchangeRates = exchangeRates;
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleCurrencyChange(userSetCurrency) {
    this.setState({ appCurrency: userSetCurrency });
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
              />
            </Route>

            <Route
              path="/products/:id"
              render={({ match }) => (
                <PageProductDetail
                  appCurrency={this.state.appCurrency}
                  exchangeRates={this.state.exchangeRates}
                  product={this.state.products.find(
                    prod => prod.id === parseInt(match.params.id)
                  )}
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
