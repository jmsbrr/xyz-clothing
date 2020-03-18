import React, { Component } from "react";

class CurrencySelector extends Component {
  render() {
    const exchangeRates = this.props.exchangeRates;

    return (
      <div>
        <form className="currency-selector">
          <label className="currency-selector__label" htmlFor="userCurrency">
            Currency:
          </label>
          <select
            className="currency-selector__select"
            id="userCurrency"
            defaultValue={this.props.appCurrency}
            onChange={event =>
              this.props.handleCurrencyChange(event.target.value)
            }
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
  }
}

export default CurrencySelector;
