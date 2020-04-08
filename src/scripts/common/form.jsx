import React, { Component } from "react";
import Joi from "@hapi/joi";
import _ from "lodash";
import FormFieldHelper from "./formFieldHelper";
import FormInputText from "./formInputText";
import FormInputCheckbox from "./formInputCheckbox";
import FormSelect from "./formSelect";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  checkValidity(schema, value) {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(value, options);
    return { valid: error === undefined, errors: error };
  }

  handleCheckboxToggle = (name, schemaPath = null) => {
    let data = { ...this.state.data };
    let toggledValue = !_.get(data, name);

    let obj = {
      name,
      value: toggledValue
    };

    // schemaPath: Allows overriding the path the schema object.
    // e.g. If the schema isn't mapped to each input in a checkbox group,
    // but instead schema is set to the parent
    if (schemaPath) {
      obj.schemaPath = schemaPath;
    }

    this.handleChange(obj);
  };

  handleChange = ({ name, value, schemaPath = null }) => {
    const pathToSchema = schemaPath ? schemaPath : name;
    const updatedValue = { [name]: value };
    const fieldSchema = { [name]: _.get(this.schema, pathToSchema) };
    const field = this.checkValidity(fieldSchema, updatedValue);
    const data = { ...this.state.data };
    let errors = { ...this.state.errors };

    _.set(data, name, value);

    if (field.valid) {
      _.unset(errors, name);
      errors = _.omitBy(errors, _.isEmpty);
    } else {
      _.set(errors, name, field.errors.message);
    }

    this.setState({ data, errors });
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = this.checkValidity(this.schema, this.state.data);
    const errors = { ...this.state.errors };

    if (form.valid) {
      this.submitTheForm();
    } else {
      for (let error of form.errors.details) {
        errors[error.path[0]] = error.message;
      }

      this.setState({ errors });
    }
  };

  renderSelect(label, id, defaultValue, options) {
    return (
      <FormFieldHelper label={label} id={id} errors={this.state.errors}>
        <FormSelect
          id={id}
          defaultValue={defaultValue}
          options={options}
          onChange={this.handleChange}
        />
      </FormFieldHelper>
    );
  }

  renderCheckbox(groupLabel, label, id, name, checked) {
    return (
      <FormFieldHelper label={groupLabel} errors={this.state.errors}>
        <FormInputCheckbox
          label={label}
          id={id}
          name={name}
          checked={checked}
          onChange={this.handleCheckboxToggle}
        />
      </FormFieldHelper>
    );
  }

  renderTextInput(label, id, defaultValue, type = "text") {
    return (
      <FormFieldHelper label={label} id={id} errors={this.state.errors}>
        <FormInputText
          id={id}
          type={type}
          defaultValue={defaultValue}
          onChange={this.handleChange}
        />
      </FormFieldHelper>
    );
  }
}

export default Form;
