import React, { Component } from "react";
import PrimaryNav from "./primaryNav";
import CurrencySelector from "./currencySelector";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <PrimaryNav />
        <CurrencySelector
          exchangeRates={this.props.exchangeRates}
          appCurrency={this.props.appCurrency}
          handleCurrencyChange={value => this.props.handleCurrencyChange(value)}
        />
      </div>
    );
  }
}

export default Sidebar;
