import React from "react";
import PrimaryNav from "../PrimaryNav";
import CurrencySelector from "../CurrencySelector";
import Logo from "../Logo";
import "./styles.scss";

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
