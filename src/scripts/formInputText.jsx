import React from "react";

const FormInputText = ({
  validationErrors,
  id,
  label,
  defaultValue,
  name,
  onInputChange
}) => {
  let fieldInvalid;
  let errorMessage = null;

  if (validationErrors !== undefined) {
    if (validationErrors.hasOwnProperty(id)) {
      fieldInvalid = true;
      errorMessage = (
        <div className="form__validation-message">{validationErrors[id]}</div>
      );
    } else {
      fieldInvalid = false;
    }
  }

  return (
    <div className={`form__row ${fieldInvalid ? "field-error" : ""} `}>
      <label className="form__label" htmlFor={id}>
        {label}:
      </label>
      <input
        className="form__input-text"
        type="text"
        defaultValue={defaultValue.toString()}
        name={name}
        id={id}
        onChange={event => {
          onInputChange(event);
        }}
      />
      {errorMessage}
    </div>
  );
};

export default FormInputText;
