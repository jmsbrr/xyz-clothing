import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ActionBar from "./action-bar";
import FormInputText from "./formInputText";
import FormInputTextarea from "./formInputTextarea";

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
      existingProductIds: this.props.products.map(prod => prod.id.toString()),
      originalId: props.product.id,
      relatedProducts: [],
      validationErrors: {},
      formValid: true
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  isValid(name, value) {
    const notEmpty = value.length > 0;
    const isCurrency = /^(\d+?)(\.\d{1,2})?$/;

    switch (name) {
      case "id":
        return notEmpty && !this.state.existingProductIds.includes(value);

      case "name":
        return value.length > 2;

      case "amount":
        return notEmpty && isCurrency.test(value);

      default:
        return true;
    }
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let stateCopy = { ...this.state };

    if (this.isValid(name, value)) {
      // If field is valid, update local state with new field value.
      if (name === "base" || name === "amount") {
        stateCopy.product.price[name] = value;
      } else {
        stateCopy.product[name] = value;
      }

      // Delete previous validation errors.
      delete stateCopy.validationErrors[name];

      stateCopy.formValid =
        Object.keys(stateCopy.validationErrors).length === 0;
      this.setState({ ...stateCopy });
    } else {
      // If field is invalid, display error messages.
      let validationErrors = { ...this.state.validationErrors };

      if (name === "id") {
        validationErrors[name] =
          "Product ID must be unique and at least 1 character long.";
      } else if (name === "name") {
        validationErrors[name] =
          "Product Name must be at least 3 characters long.";
      } else if (name === "amount") {
        validationErrors[name] =
          "Price must only contain numbers + a single decimal point. e.g. 59.95";
      } else {
        validationErrors[name] = "Sorry, that value is invalid for this field.";
      }

      this.setState({
        validationErrors,
        formValid: Object.keys(validationErrors).length === 0
      });
    }
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
        <label
          className="related-products-table__row"
          htmlFor={`check-${prod.id}`}
          key={prod.id}
        >
          <span className="related-products-table__col">
            <input
              className="related-products-table__col"
              type="checkbox"
              name={prod.id}
              id={`check-${prod.id}`}
              checked={this.state.relatedProducts[index].active}
              onChange={event => this.handleCheckboxChange(event, index)}
            />
          </span>
          <span className="related-products-table__col">{prod.id}</span>
          <span className="related-products-table__col">{prod.name}</span>
        </label>
      )
    );

    if (this.props.redirect) {
      return <Redirect to="/products/" />;
    }

    return (
      <React.Fragment>
        <div className="product-detail">
          <form
            className="form"
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
            <ActionBar
              product={product}
              mode="edit"
              formValid={this.state.formValid}
            />

            <FormInputText
              label="Product ID"
              id="id"
              defaultValue={this.state.product.id}
              name="id"
              handleInputChange={event => this.handleInputChange(event)}
              validationErrors={this.state.validationErrors}
            />

            <FormInputText
              label="Product Name"
              id="name"
              defaultValue={this.state.product.name}
              name="name"
              handleInputChange={event => this.handleInputChange(event)}
              validationErrors={this.state.validationErrors}
            />

            <FormInputTextarea
              label="Description"
              id="description"
              defaultValue={this.state.product.description}
              name="description"
              handleInputChange={event => this.handleInputChange(event)}
              validationErrors={this.state.validationErrors}
            />

            <div className="form__row">
              <label className="form__label" htmlFor="base">
                Base Currency:
              </label>
              <select
                className="currency-selector__select"
                defaultValue={this.state.product.price.base}
                name="base"
                id="base"
                onChange={event => this.handleInputChange(event)}
              >
                {exchangeRates.map(opt => (
                  <option value={opt.base} key={opt.base}>
                    {opt.base}
                  </option>
                ))}
              </select>
            </div>

            <FormInputText
              label="Price"
              id="amount"
              defaultValue={this.state.product.price.amount}
              name="amount"
              handleInputChange={event => this.handleInputChange(event)}
              validationErrors={this.state.validationErrors}
            />

            <div className="form__row">
              <div className="form__label">Related Products:</div>
              <div className="related-products-table">
                <div className="related-products-table__header">
                  <div className="related-products-table__col"></div>
                  <div className="related-products-table__col">ID</div>
                  <div className="related-products-table__col">
                    Product Name
                  </div>
                </div>

                {relatedProductsList}
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PageProductEdit;
