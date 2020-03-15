import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProduct from "./pageProduct";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Route path="/" exact>
            <PageDashboard />
          </Route>
          <Route path="/products">
            <PageProduct />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
