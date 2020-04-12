import React from "react";

const FormSelect = ({ id, defaultValue, onChange, options }) => {
  return (
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
  );
};

export default FormSelect;
