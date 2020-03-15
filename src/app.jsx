import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageDashboard from "./pageDashboard";
import PageProduct from "./pageProduct";
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
            <PageProduct />
          </Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
