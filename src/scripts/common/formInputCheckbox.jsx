import React from "react";

const FormInputCheckbox = ({ label, id, name, checked, onChange }) => {
  return (
    <div className="form__input-check">
      <input
        className="checkbox"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={() => onChange(name)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormInputCheckbox;
