import React, { Component } from "react";

const FormInputText = props => {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor={props.id}>
        {props.label}:
      </label>
      <textarea
        className="form__input-textarea"
        type="text"
        defaultValue={props.defaultValue}
        name={props.name}
        id={props.id}
        onChange={event => {
          props.onInputChange(event);
        }}
      />
    </div>
  );
};

export default FormInputText;
