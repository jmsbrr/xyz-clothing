import React, { Component } from "react";

class FormInputText extends Component {
  render() {
    const validationErrors = this.props.validationErrors;
    let fieldInvalid;
    let errorMessage = null;

    if (validationErrors !== undefined) {
      if (validationErrors.hasOwnProperty(this.props.id)) {
        fieldInvalid = true;
        errorMessage = (
          <div className="form__validation-message">
            {validationErrors[this.props.id]}
          </div>
        );
      } else {
        fieldInvalid = false;
      }
    }

    return (
      <div className={`form__row ${fieldInvalid ? "field-error" : ""} `}>
        <label className="form__label" htmlFor={this.props.id}>
          {this.props.label}:
        </label>
        <input
          className="form__input-text"
          type="text"
          defaultValue={this.props.defaultValue.toString()}
          name={this.props.name}
          id={this.props.id}
          onChange={event => {
            this.props.onInputChange(event);
          }}
        />
        {errorMessage}
      </div>
    );
  }
}

export default FormInputText;
