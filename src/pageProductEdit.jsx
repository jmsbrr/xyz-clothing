import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class PageProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: props.product.id,
        name: props.product.name,
        description: props.product.description,
        price: {
          base: props.product.price.base,
          amount: props.product.price.amount
        },
        relatedProducts: props.product.relatedProducts
      },
      hasChanged: false,
      originalId: props.product.id
    };
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const stateCopy = { ...this.state };

    if (name === "base" || name === "amount") {
      stateCopy.product.price[name] = value;
    } else if (name === "id") {
      stateCopy.product[name] = parseInt(value);
    } else {
      stateCopy.product[name] = value;
    }

    this.setState({ ...stateCopy });
  }

  render() {
    const product = this.props.product;
    const exchangeRates = this.props.exchangeRates;

    if (this.props.redirect) {
      return <Redirect to="/products/" />;
    }

    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.handleProductUpdate(
              this.state.product,
              this.state.originalId
            );
          }}
        >
          <div>
            <input
              type="text"
              defaultValue={this.state.product.id}
              name="id"
              onChange={event => {
                this.handleInputChange(event);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              defaultValue={this.state.product.name}
              name="name"
              onChange={event => {
                this.handleInputChange(event);
              }}
            />
          </div>
          <div>
            <textarea
              defaultValue={this.state.product.description}
              name="description"
              onChange={event => {
                this.handleInputChange(event);
              }}
            />
          </div>
          <div>
            <select
              className="currency-selector__select"
              defaultValue={this.state.product.price.base}
              name="base"
              onChange={event => this.handleInputChange(event)}
            >
              {exchangeRates.map(opt => (
                <option value={opt.base} key={opt.base}>
                  {opt.base}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              defaultValue={this.state.product.price.amount}
              name="amount"
              onChange={event => {
                this.handleInputChange(event);
              }}
            />
          </div>
          <input type="submit" value="submit" />
          <Link to={`/products/${product.id}`}>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default PageProductEdit;
