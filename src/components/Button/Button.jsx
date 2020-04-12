import React from "react";
import "./styles.scss";

const getClasses = modifier => {
  return "button " + (modifier ? modifier : "button--primary");
};

const renderButton = (props, Tag) => {
  return (
    <Tag className={getClasses(props.modifier)} {...props.config}>
      {props.label}
    </Tag>
  );
};

const Button = props => {
  if (props.label === undefined) return null;

  const { element: el } = props;

  if (el && (el === "a" || el === "div" || el === "span")) {
    return renderButton(props, el);
  } else {
    return renderButton(props, "button");
  }
};

export default Button;
