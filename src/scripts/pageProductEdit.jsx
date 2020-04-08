import React, { Component } from "react";
import ActionBar from "./action-bar";
import ProductForm from "./productForm";

class PageProductEdit extends Component {
  state = { formError: false };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  updateFormValidity = formError => {
    this.setState({ formError });
  };

  render() {
    return (
      <React.Fragment>
        <div className="product-detail">
          <ActionBar
            product={this.props.product}
            mode="edit"
            formError={this.state.formError}
          />
          <ProductForm {...this.props} onFormError={this.updateFormValidity} />
        </div>
      </React.Fragment>
    );
  }
}

export default PageProductEdit;
