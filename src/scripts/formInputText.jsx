import React from "react";
import _ from "lodash";

const FormInputText = ({
  errors,
  id,
  label,
  defaultValue,
  name,
  onInputChange
}) => {
  let fieldInvalid;
  let errorMessage = null;

  if (_.has(errors, id)) {
    fieldInvalid = true;
    errorMessage = (
      <div className="form__validation-message">{_.get(errors, id)}</div>
    );
  } else {
    fieldInvalid = false;
  }

  return (
    <div className={`form__row ${fieldInvalid && "field-error"} `}>
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
