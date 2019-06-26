import React from "react";
import moment from "moment";
import Joi from "joi-browser";
import Form from "./common/Form";

import { saveMeds, getMeds } from "../services/fakeMedsService";
import { getPatients } from "../services/fakePatientsService";

class MedsForm extends Form {
  state = {
    currentDate: moment(),
    data: {
      title: "",
      dose: "",
      patient: "",
      frequency: [],
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      notify: true
    },
    patients: [],

    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    dose: Joi.string(),
    patient: Joi.string(),
    frequency: Joi.array().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    notify: Joi.bool()
  };

  componentDidMount() {
    const patients = getPatients();
    this.setState({ patients });

    const medsId = this.props.match.params.id;
    if (medsId === "new") return;

    const meds = getMeds(medsId);
    if (!meds) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(meds) });
  }

  mapToViewModel(meds) {
    return {
      _id: meds._id,
      title: meds.title,
      dose: meds.dose,
      patient: meds.patient._id,
      frequency: meds.frequency,
      startDate: meds.startDate,
      endDate: meds.endDate,
      notify: meds.notify
    };
  }

  doSubmit = () => {
    saveMeds(this.state.data);

    this.props.history.push("/medicine");
  };

  render() {
    return (
      <div>
        <h1>MedsForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "title",
            "Название лекарства",
            "Введите название лекарства"
          )}
          {this.renderInput("dose", "Дозировка")}
          {this.renderSelect("patient", "Кому принимать", this.state.patients)}
          {this.renderFrequencyInput("frequency", "Частота приема")}
          {this.renderInput("startDate", "Начало приема", "", "date")}
          {this.renderInput("endDate", "Окончание приема", "", "date")}
          {this.renderCheckbox("notify", "Присылать уведомления")}
          {this.renderButton("Готово")}
        </form>
      </div>
    );
  }
}

export default MedsForm;
