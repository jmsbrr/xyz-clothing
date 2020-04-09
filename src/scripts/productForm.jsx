import React from "react";
import CheckboxTable from "./checkboxTable";
import Form from "./common/form";
import Skeleton from "./skeletons/skeleton";
import Joi from "@hapi/joi";

class ProductForm extends Form {
  init(props) {
    const {
      product: { relatedProducts, name, id, price, description },
      products = []
    } = props;

    if (products.length === 0) return;

    this.setState({
      data: {
        id: id,
        name: name,
        description: description,
        price: {
          base: price.base,
          amount: price.amount.toString()
        },
        relatedProducts: products
          .filter(prod => prod.id !== id)
          .map(prod => ({
            id: prod.id,
            name: prod.name,
            active: relatedProducts.includes(prod.id)
          }))
      }
    });

    this.originalId = id;
    this.illegalProductIds = products
      .filter(prod => prod.id !== id)
      .map(prod => prod.id);

    this.schema = {
      id: Joi.number()
        .required()
        .invalid(...this.illegalProductIds)
        .messages({
          "number.base": "ID must be a number",
          "any.invalid": "That ID is already in use"
        }),
      name: Joi.string()
        .required()
        .min(2)
        .messages({
          "string.empty": "Name is required",
          "string.min": "Name must be at least 2 characters"
        }),
      description: Joi.any(),
      price: {
        amount: Joi.string()
          .required()
          .pattern(/^(\d+?)(\.\d{1,2})?$/)
          .messages({
            "string.empty": "Price is required",
            "string.pattern.base":
              "Price should be precise to 2 decimal places. e.g. 59.95"
          }),
        base: Joi.any()
      },
      relatedProducts: Joi.any()
    };
  }

  checkComponentHasData(props) {
    const { data } = this.state;
    if (props.products.length > 0 && data.relatedProducts === undefined) {
      this.init(props);
    }
  }

  componentDidMount() {
    this.checkComponentHasData(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) this.raiseFormStatus();
    this.checkComponentHasData(prevProps);
  }

  raiseFormStatus = () => {
    this.props.onFormError(Object.keys(this.state.errors).length > 0);
  };

  submitTheForm() {
    const data = { ...this.state.data };

    // Parse the product price
    data.price.amount = parseFloat(data.price.amount);

    // Restore the structure of related products
    data.relatedProducts = data.relatedProducts
      .filter(prod => prod.active === true)
      .map(prod => prod.id);

    this.props.onProductUpdate(data, this.originalId, this.props.history);
  }

  render() {
    const { data } = this.state;

    if (data.id === undefined) {
      return <Skeleton />;
    }

    const tableColumns = ["ID", "Product Name"];
    const tableData = data.relatedProducts.map((prod, index) => ({
      checked: data.relatedProducts[index].active,
      name: `relatedProducts[${index}].active`,
      path: "relatedProducts",
      id: prod.id,
      columns: [prod.id, prod.name]
    }));

    return (
      <form id="product-edit" className="form" onSubmit={this.handleSubmit}>
        {this.renderTextInput("Product ID", "id", data.id, "number")}
        {this.renderTextInput("Product name", "name", data.name)}
        {this.renderTextInput(
          "Description",
          "description",
          data.description,
          "textarea"
        )}

        {this.renderSelect(
          "Base Currency",
          "price.base",
          data.price.base,
          this.props.exchangeRates.map(rate => rate.base)
        )}

        {this.renderTextInput("Price", "price.amount", data.price.amount)}

        <CheckboxTable
          tableName="Related Products"
          columns={tableColumns}
          data={tableData}
          onChange={this.handleCheckboxToggle}
        />
      </form>
    );
  }
}

export default ProductForm;
