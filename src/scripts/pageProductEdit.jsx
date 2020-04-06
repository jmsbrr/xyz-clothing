import React, { Component } from "react";
import ActionBar from "./action-bar";
import FormInputText from "./formInputText";
import FormInputTextarea from "./formInputTextarea";
import Joi from "@hapi/joi";
import _ from "lodash";

class PageProductEdit extends Component {
  constructor(props) {
    super(props);

    const {
      product: {
        id,
        name,
        description,
        price: { base, amount },
        relatedProducts
      },
      products
    } = props;

    this.state = {
      product: {
        id: id.toString(),
        name,
        description,
        price: {
          base,
          amount: amount.toString()
        },
        relatedProducts
      },
      existingProductIds: products
        .filter(prod => prod.id !== id)
        .map(prod => prod.id.toString()),
      originalId: id,
      relatedProducts: [],
      errors: {}
    };

    // Generate a model for all products
    // for the related products table
    this.state.relatedProducts = products
      .filter(prod => prod.id !== id)
      .map(prod => ({
        id: prod.id,
        name: prod.name,
        active: relatedProducts.includes(prod.id)
      }));

    this.schema = {
      id: Joi.string()
        .alphanum()
        .required()
        .invalid(...this.state.existingProductIds)
        .messages({
          "string.alphanum": "ID must only contain letters and/or numbers",
          "string.invalid": "ID must be unique",
          "any.required": "ID is required"
        }),
      name: Joi.string()
        .required()
        .min(2)
        .messages({
          "string.min": "Name be at least 2 characters long"
        }),
      description: Joi.any(),
      price: {
        amount: Joi.string()
          .required()
          .pattern(/^(\d+?)(\.\d{1,2})?$/)
          .messages({
            "any.required": "Price is required",
            "string.pattern":
              "Price must only contain numbers + a single decimal point. e.g. 59.95"
          }),
        base: Joi.any()
      },
      relatedProducts: Joi.any()
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCheckboxChange(event, arrIndex) {
    let relatedProducts = [...this.state.relatedProducts];
    relatedProducts[arrIndex].active = !relatedProducts[arrIndex].active;
    this.setState({ relatedProducts: relatedProducts });
  }

  checkValidity(schema, value) {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(value, options);
    return { valid: error === undefined, errors: error };
  }

  handleChange({ name, value }) {
    const change = { [name]: value };
    const schema = { [name]: _.get(this.schema, name) };
    const field = this.checkValidity(schema, change);
    const product = { ...this.state.product };
    const errors = { ...this.state.errors };

    _.set(product, name, value);

    if (field.valid) {
      _.unset(errors, name);
    } else {
      _.set(errors, name, field.errors.message);
    }

    this.setState({ product, errors });
  }

  handleSubmit = event => {
    event.preventDefault();
    const form = this.checkValidity(this.schema, this.state.product);
    const errors = { ...this.state.errors };

    if (form.valid) {
      this.props.onProductUpdate(
        this.state.product,
        this.state.originalId,
        this.state.relatedProducts
          .filter(prod => prod.active === true)
          .map(prod => prod.id),
        this.props.history
      );
    } else {
      for (let error of form.errors.details) {
        errors[error.path[0]] = error.message;
      }

      this.setState({ errors });
    }
  };

  render() {
    const { product, exchangeRates } = this.props;
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

    return (
      <React.Fragment>
        <div className="product-detail">
          <ActionBar
            product={product}
            mode="edit"
            formValid={Object.keys(this.state.errors).length === 0}
          />

          <form id="product-edit" className="form" onSubmit={this.handleSubmit}>
            <FormInputText
              label="Product ID"
              id="id"
              defaultValue={this.state.product.id}
              name="id"
              onInputChange={event => this.handleChange(event.target)}
              errors={this.state.errors}
            />

            <FormInputText
              label="Product Name"
              id="name"
              defaultValue={this.state.product.name}
              name="name"
              onInputChange={event => this.handleChange(event.target)}
              errors={this.state.errors}
            />

            <FormInputTextarea
              label="Description"
              id="description"
              defaultValue={this.state.product.description}
              name="description"
              onInputChange={event => this.handleChange(event.target)}
              errors={this.state.errors}
            />

            <div className="form__row">
              <label className="form__label" htmlFor="price.base">
                Base Currency:
              </label>
              <select
                className="currency-selector__select"
                defaultValue={this.state.product.price.base}
                name="price.base"
                id="price.base"
                onChange={event => this.handleChange(event.target)}
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
              id="price.amount"
              defaultValue={this.state.product.price.amount}
              name="price.amount"
              onInputChange={event => this.handleChange(event.target)}
              errors={this.state.errors}
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
