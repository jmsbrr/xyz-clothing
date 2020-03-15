import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import Sidebar from "./sidebar";
import productsData from "./products.json";

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

          <Route path="/" exact>
            <PageDashboard />
          </Route>

          <Route path="/products">
            <PageProducts products={this.state.products} />
          </Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
