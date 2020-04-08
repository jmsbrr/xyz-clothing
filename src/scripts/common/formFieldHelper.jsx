import React from "react";
import _ from "lodash";

const getLabel = (label, id) => {
  if (id === null) {
    return <div className="form__label">{label}:</div>;
  }

  return (
    <label className="form__label" htmlFor={id}>
      {label}:
    </label>
  );
};

const FormFieldHelper = props => {
  const { errors, label, id = null } = props;
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
    <div className={`form__row ${fieldInvalid ? "field-error" : ""}`}>
      {getLabel(label, id)}
      {props.children}
      {errorMessage}
    </div>
  );
};

export default FormFieldHelper;
