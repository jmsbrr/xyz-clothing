import React, { Component } from "react";
import PrimaryNav from "./primaryNav";
import CurrencySelector from "./currencySelector";
import Logo from "./logo";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <div>
        <Logo />
        <PrimaryNav />
      </div>

      <CurrencySelector
        exchangeRates={props.exchangeRates}
        appCurrency={props.appCurrency}
        onCurrencyChange={props.onCurrencyChange}
      />
    </div>
  );
};

export default Sidebar;
