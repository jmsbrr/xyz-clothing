import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProducts from "./pageProducts";
import Sidebar from "./sidebar";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Sidebar />

          <Route path="/" exact>
            <PageDashboard />
          </Route>

          <Route path="/products">
            <PageProducts />
          </Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
