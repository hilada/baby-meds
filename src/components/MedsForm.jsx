import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { saveMeds, getMeds } from "../services/fakeMedsService";
import { getPatients } from "../services/fakePatientsService";

class MedsForm extends Form {
  state = {
    data: {
      title: "",
      dose: "",
      patient: "",
      frequency: "",
      duration: "",
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
    frequency: Joi.string().required(),
    duration: Joi.string().required(),
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
      duration: meds.duration,
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
          {this.renderInput("frequency", "Частота приема")}
          {this.renderInput("duration", "Продолжительность курса")}
          {this.renderCheckbox("notify", "Присылать уведомления")}
          {this.renderButton("Готово")}
        </form>
      </div>
    );
  }
}

export default MedsForm;
