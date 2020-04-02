import React, { Component } from "react";
import PrimaryNav from "./primaryNav";
import CurrencySelector from "./currencySelector";
import Logo from "./logo";

const Sidebar = ({ exchangeRates, appCurrency, onCurrencyChange }) => {
  return (
    <div className="sidebar">
      <div>
        <Logo />
        <PrimaryNav />
      </div>

      <CurrencySelector
        exchangeRates={exchangeRates}
        appCurrency={appCurrency}
        onCurrencyChange={onCurrencyChange}
      />
    </div>
  );
};

export default Sidebar;
