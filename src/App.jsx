import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import PageDashboard from "./pages/Dashboard";
import PageNotFound from "./pages/NotFound";
import PageProducts from "./pages/Products";
import PageProductDetail from "./pages/ProductDetail";
import PageProductEdit from "./pages/ProductEdit";
import PageProductAdd from "./pages/ProductAdd";
import Sidebar from "./components/Sidebar";
import "./styles/app.scss";

const http = axios.create({
  baseURL: "//localhost:3000/data"
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      exchangeRates: [],
      appCurrency: null
    };
  }

  async componentDidMount() {
    const { data: products } = await http.get("/products.json");
    this.setState({ products });

    const { data: exchangeRates } = await http.get("/exchange_rates.json");
    this.setState({ exchangeRates, appCurrency: "AUD" });
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
                path="/products/:id/"
                render={({ match, location, history }) => {
                  const product = this.state.products.find(
                    prod => prod.id.toString() === match.params.id
                  );

                  // That product doesn't exist – redirect the user.
                  if (this.state.products.length > 0 && product === undefined) {
                    return <Redirect to="/not-found" />;
                  }

                  return (
                    <Switch>
                      <Route path="/products/:id/edit">
                        <PageProductEdit
                          products={this.state.products}
                          product={this.state.products.find(
                            prod => prod.id.toString() === match.params.id
                          )}
                          onProductUpdate={this.handleProductUpdate}
                          exchangeRates={this.state.exchangeRates}
                          history={history}
                        />
                      </Route>

                      <Route path="/products/:id/">
                        <PageProductDetail
                          appCurrency={this.state.appCurrency}
                          exchangeRates={this.state.exchangeRates}
                          products={this.state.products}
                          product={product}
                        />
                      </Route>
                    </Switch>
                  );
                }}
              ></Route>

              <Route path="/products">
                <PageProducts
                  appCurrency={this.state.appCurrency}
                  exchangeRates={this.state.exchangeRates}
                  products={this.state.products}
                />
              </Route>
              <Route path="/not-found">
                <PageNotFound />
              </Route>
              <Route exact path="/">
                <PageDashboard />
              </Route>
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
