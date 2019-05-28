import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { savePatient } from "./../services/fakePatientsService";

class PatientForm extends Form {
  state = {
    data: { name: "" },
    errors: {}
  };

  schema = {
    name: Joi.string().required()
  };

  doSubmit = () => {
    savePatient(this.state.data);

    this.props.history.push("/medicine");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Имя ребенка", "Введите имя ребенка")}
        {this.renderButton("Добавить")}
      </form>
    );
  }
}

export default PatientForm;
