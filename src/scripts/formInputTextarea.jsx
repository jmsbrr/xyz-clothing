import React from "react";

const FormInputText = ({ id, label, defaultValue, name, onInputChange }) => {
  return (
    <div className="form__row">
      <label className="form__label" htmlFor={id}>
        {label}:
      </label>
      <textarea
        className="form__input-textarea"
        type="text"
        defaultValue={defaultValue}
        name={name}
        id={id}
        onChange={event => {
          onInputChange(event);
        }}
      />
    </div>
  );
};

export default FormInputText;
