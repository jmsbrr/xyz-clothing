import React from "react";
import _ from "lodash";

const FormSelect = ({ errors, id, label, defaultValue, onChange, options }) => {
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
      <label className="form__label" htmlFor={id}>
        {label}:
      </label>
      <select
        className="form__select"
        defaultValue={defaultValue}
        name={id}
        id={id}
        onChange={event => onChange(event.target)}
      >
        {options.map(opt => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage}
    </div>
  );
};

export default FormSelect;
