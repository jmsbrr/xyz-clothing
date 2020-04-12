import React, { Component } from "react";
import ActionBar from "../components/ActionBar";
import ProductForm from "../forms/ProductForm";

class PageProductAdd extends Component {
  state = { formError: true };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  updateFormValidity = formError => {
    this.setState({ formError });
  };

  render() {
    const product = {
      id: null,
      name: null,
      description: null,
      price: {
        base: "AUD",
        amount: 0
      },
      relatedProducts: []
    };

    return (
      <React.Fragment>
        <div className="product-detail">
          <ActionBar
            product={product}
            mode="edit"
            formError={this.state.formError}
          />
          <ProductForm
            {...this.props}
            product={product}
            onFormError={this.updateFormValidity}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default PageProductAdd;
