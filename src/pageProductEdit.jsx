import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ActionBar from "./action-bar";

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
      originalId: props.product.id,
      relatedProducts: []
    };

    this.state.relatedProducts = this.props.products.map(prod => ({
      id: prod.id,
      name: prod.name,
      active: props.product.relatedProducts.includes(prod.id)
    }));

    const indexInProducts = this.state.relatedProducts.findIndex(
      prod => prod.id === props.product.id
    );

    this.state.relatedProducts.splice(indexInProducts, 1);
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

  handleCheckboxChange(event, arrIndex) {
    let relatedProducts = this.state.relatedProducts;
    relatedProducts[arrIndex].active = !relatedProducts[arrIndex].active;
    this.setState({ ...relatedProducts });
  }

  render() {
    const product = this.props.product;
    const exchangeRates = this.props.exchangeRates;
    const relatedProductsList = this.state.relatedProducts.map(
      (prod, index) => (
        <div key={prod.id}>
          <label htmlFor={`check-${prod.id}`}>
            ID: {prod.id}&nbsp;&nbsp;|&nbsp;&nbsp;{prod.name}&nbsp;&nbsp;
          </label>
          <input
            type="checkbox"
            name={prod.id}
            id={`check-${prod.id}`}
            checked={this.state.relatedProducts[index].active}
            onChange={event => this.handleCheckboxChange(event, index)}
          />
        </div>
      )
    );

    if (this.props.redirect) {
      return <Redirect to="/products/" />;
    }

    return (
      <React.Fragment>
        <div className="product-detail">
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.handleProductUpdate(
                this.state.product,
                this.state.originalId,
                this.state.relatedProducts.filter(prod => prod.active === true)
              );
            }}
          >
            {/* ActionBar inside form for submit button positioning. */}
            <ActionBar product={product} mode="edit" />
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

            <div>{relatedProductsList}</div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PageProductEdit;
