import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import FrequencyInputPopup from "../FrequencyInput/FrequencyInputPopup";
import Modal from "./Modal/Modal";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    showFrequencyInputPopup: false
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleCheckboxChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = !data[input.name];
    this.setState({ data });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-success mb-2">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, placeholder = "", type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  handleModalOpen = () => {
    this.setState({ showFrequencyInputPopup: true })
  }

  handleModalClose = (input) => {
   

    const data = { ...this.state.data };
    data.frequency = input;
    console.log(input)

    this.setState({ showFrequencyInputPopup: false, data });
    

  };

  renderFrequencyInput(name, label) {
    const { data, errors } = this.state;

    return (
      <div>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <div
            name={name}
            id={name}
            className="form-control"            
            onClick={this.handleModalOpen}
          >{data.frequency.map(num => {
            return <span key={num}>{num}:00; </span>
          })}</div>
          {errors[name] && (
            <div className="alert alert-danger">{errors[name]}</div>
          )}
        </div>
        <Modal
          show={this.state.showFrequencyInputPopup}
          modalClosed={this.handleModalClose}
        >
          <FrequencyInputPopup
            clicked={input => this.handleModalClose(input)}
          />
        </Modal>
      </div>
    );
  }

  renderCheckbox(name, label) {
    const { data } = this.state;

    return (
      <Checkbox
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleCheckboxChange}
        checked={data[name]}
      />
    );
  }
}
export default Form;
