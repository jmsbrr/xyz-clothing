import React, { Component } from "react";

class FormInputText extends Component {
  render() {
    return (
      <div className="form__row">
        <label className="form__label" htmlFor={this.props.id}>
          {this.props.label}:
        </label>
        <input
          className="form__input-text"
          type="text"
          defaultValue={this.props.defaultValue}
          name={this.props.name}
          id={this.props.id}
          onChange={event => {
            this.props.handleInputChange(event);
          }}
        />
      </div>
    );
  }
}

export default FormInputText;
