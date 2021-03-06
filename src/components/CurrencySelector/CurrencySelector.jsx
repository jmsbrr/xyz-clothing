import React from "react";
import "./styles.scss";

const CurrencySelector = ({ appCurrency, exchangeRates, onCurrencyChange }) => {
  return (
    <div>
      <form className="currency-selector">
        <label className="currency-selector__label" htmlFor="userCurrency">
          Currency:
        </label>
        <select
          className="currency-selector__select"
          id="userCurrency"
          defaultValue={appCurrency}
          onChange={event => onCurrencyChange(event.target.value)}
        >
          {exchangeRates.map(opt => (
            <option value={opt.base} key={opt.base}>
              {opt.base}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CurrencySelector;
