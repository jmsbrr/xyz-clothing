import React, { Component } from "react";

class PriceBadge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: this.props.appCurrency
    };
  }

  componentDidMount() {
    this.updatePrice();
  }

  componentDidUpdate() {
    // Currency has been modified by user – update the product price.
    if (this.state.currency !== this.props.appCurrency) {
      this.updatePrice();
    }
  }

  updatePrice() {
    const { amount: productPrice, base: baseCurrency } = this.props.price;

    // Some of the data hasn't been loaded yet.
    if (this.props.appCurrency === null || productPrice === undefined) return;

    if (baseCurrency === this.props.appCurrency) {
      this.setPrice(productPrice);
    } else {
      this.convertPrice(productPrice, baseCurrency);
    }
  }

  setPrice(productPrice) {
    this.setState({
      formattedPrice: this.formatPrice(productPrice),
      currency: this.props.appCurrency
    });
  }

  convertPrice(productPrice, baseCurrency) {
    const exchangeRates = this.props.exchangeRates;

    // if (exchangeRates.length === 0) return;

    const rateTable = exchangeRates.filter(
      item => item.base === baseCurrency
    )[0];
    const exchangeRate = rateTable.rates[this.props.appCurrency];
    const exchangedProductPrice = productPrice * exchangeRate;

    this.setPrice(exchangedProductPrice);
  }

  formatPrice(productPrice) {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: this.props.appCurrency
    }).format(productPrice);
  }

  render() {
    // if (this.state.formattedPrice === undefined) {
    //   return null;
    // }

    return (
      <div className={this.props.className}>{this.state.formattedPrice}</div>
    );
  }
}

export default PriceBadge;
