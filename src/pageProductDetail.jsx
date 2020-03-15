import React, { Component } from "react";

class PageProductDetail extends Component {
  render() {
    return (
      <div className="product">
        <h1>{this.props.product.name}</h1>
        <p>{this.props.product.description}</p>
        <p>{this.props.product.price.amount}</p>
      </div>
    );
  }
}

export default PageProductDetail;
