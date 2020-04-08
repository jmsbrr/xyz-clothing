import React from "react";

const renderInput = ({ id, defaultValue, onChange, type = "text" }) => {
  const attributes = {
    className: "form__input-text",
    name: id,
    id,
    defaultValue,
    onChange(e) {
      onChange(e.target);
    }
  };

  if (type === "textarea") return <textarea {...attributes} />;
  return <input {...attributes} type={type} />;
};

const FormInputText = props => {
  return <div>{renderInput(props)}</div>;
};

export default FormInputText;
