import React, { Component } from "react";
import ActionBar from "./action-bar";
import FormInputText from "./formInputText";
import FormInputTextarea from "./formInputTextarea";
import CheckboxTable from "./checkboxTable";
import FormSelect from "./formSelect";
import Joi from "@hapi/joi";
import _ from "lodash";

class PageProductEdit extends Component {
  constructor(props) {
    super(props);

    const { product, products } = props;

    this.state = {
      product: {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: {
          base: product.price.base,
          amount: product.price.amount.toString()
        },
        relatedProducts: product.relatedProducts
      },
      existingProductIds: products
        .filter(prod => prod.id !== id)
        .map(prod => prod.id.toString()),
      originalId: id,
      relatedProducts: [],
      errors: {}
    };

    // Build a model for the related products table
    this.state.relatedProducts = products
      .filter(prod => prod.id !== id)
      .map(prod => ({
        id: prod.id,
        name: prod.name,
        active: relatedProducts.includes(prod.id)
      }));

    // Validation Schema
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
        base: Joi.any().invalid("AUD")
      },
      relatedProducts: Joi.any()
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  checkValidity(schema, value) {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(value, options);
    return { valid: error === undefined, errors: error };
  }

  handleCheckboxChange = (event, arrIndex) => {
    let relatedProducts = [...this.state.relatedProducts];
    relatedProducts[arrIndex].active = !relatedProducts[arrIndex].active;
    this.setState({ relatedProducts: relatedProducts });
  };

  handleChange = ({ name, value }) => {
    const change = { [name]: value };
    const schema = { [name]: _.get(this.schema, name) };
    const field = this.checkValidity(schema, change);
    const product = { ...this.state.product };
    let errors = { ...this.state.errors };

    _.set(product, name, value);

    if (field.valid) {
      _.unset(errors, name);
      errors = _.omitBy(errors, _.isEmpty);
    } else {
      _.set(errors, name, field.errors.message);
    }

    this.setState({ product, errors });
  };

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
    const tableColumns = ["ID", "Product Name"];
    const tableData = this.state.relatedProducts.map((prod, index) => ({
      checked: this.state.relatedProducts[index].active,
      id: prod.id,
      columns: [prod.id, prod.name]
    }));

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
              onChange={this.handleChange}
              errors={this.state.errors}
            />

            <FormInputText
              label="Product Name"
              id="name"
              defaultValue={this.state.product.name}
              onChange={this.handleChange}
              errors={this.state.errors}
            />

            <FormInputText
              label="Description"
              id="description"
              type="textarea"
              defaultValue={this.state.product.description}
              onChange={this.handleChange}
              errors={this.state.errors}
            />

            <FormSelect
              label="Base Currency"
              id="price.base"
              defaultValue={this.state.product.price.base}
              onChange={this.handleChange}
              options={exchangeRates.map(rate => rate.base)}
              errors={this.state.errors}
            />

            <FormInputText
              label="Price"
              id="price.amount"
              defaultValue={this.state.product.price.amount}
              onChange={this.handleChange}
              errors={this.state.errors}
            />

            <CheckboxTable
              tableName="Related Products"
              columns={tableColumns}
              data={tableData}
              onChange={this.handleCheckboxChange}
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PageProductEdit;
