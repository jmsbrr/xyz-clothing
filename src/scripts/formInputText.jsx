import React, { Component } from "react";

const FormInputText = props => {
  const validationErrors = props.validationErrors;
  let fieldInvalid;
  let errorMessage = null;

  if (validationErrors !== undefined) {
    if (validationErrors.hasOwnProperty(props.id)) {
      fieldInvalid = true;
      errorMessage = (
        <div className="form__validation-message">
          {validationErrors[props.id]}
        </div>
      );
    } else {
      fieldInvalid = false;
    }
  }

  return (
    <div className={`form__row ${fieldInvalid ? "field-error" : ""} `}>
      <label className="form__label" htmlFor={props.id}>
        {props.label}:
      </label>
      <input
        className="form__input-text"
        type="text"
        defaultValue={props.defaultValue.toString()}
        name={props.name}
        id={props.id}
        onChange={event => {
          props.onInputChange(event);
        }}
      />
      {errorMessage}
    </div>
  );
};

export default FormInputText;
