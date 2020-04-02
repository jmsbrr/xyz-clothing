import React, { Component } from "react";

const CurrencySelector = props => {
  return (
    <div>
      <form className="currency-selector">
        <label className="currency-selector__label" htmlFor="userCurrency">
          Currency:
        </label>
        <select
          className="currency-selector__select"
          id="userCurrency"
          defaultValue={props.appCurrency}
          onChange={event => props.onCurrencyChange(event.target.value)}
        >
          {props.exchangeRates.map(opt => (
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
