import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import PageProductDetail from "./pageProductDetail";
import Sidebar from "./sidebar";
import productsData from "./products.json";
import "./app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.products = productsData;
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Sidebar />

          <div className="main">
            <Route path="/" exact>
              <PageDashboard />
            </Route>

            <Route path="/products" exact>
              <PageProducts products={this.state.products} />
            </Route>

            <Route
              path="/products/:id"
              render={({ match }) => (
                <PageProductDetail
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
