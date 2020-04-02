import React, { Component } from "react";
import PrimaryNav from "./primaryNav";
import CurrencySelector from "./currencySelector";
import Logo from "./logo";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div>
          <Logo />
          <PrimaryNav />
        </div>
        <CurrencySelector
          exchangeRates={this.props.exchangeRates}
          appCurrency={this.props.appCurrency}
          onCurrencyChange={this.props.onCurrencyChange}
        />
      </div>
    );
  }
}

export default Sidebar;
