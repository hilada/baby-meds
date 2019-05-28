import React, { Component } from "react";
import TimeTable from "./TimeTable";
import { Link } from "react-router-dom";
import { getMedsCollection } from "./../services/fakeMedsService";
import { getPatients } from "../services/fakePatientsService";
import ListGroup from "./common/ListGroup";



class Meds extends Component {
  state = {
    meds: [],
    patients: [],
    selectedPatient: null
  };

  componentDidMount() {
    const patients = [{ name: "Все дети", _id: "" }, ...getPatients()];

    this.setState({ meds: getMedsCollection(), patients });
  }

  handlePatientSelect = patient => {
    this.setState({ selectedPatient: patient });
  };

  handleClick = m => {
    const meds = [...this.state.meds];
    const index = meds.indexOf(m);
    meds[index] = { ...meds[index] };
    meds[index].token = !meds[index].token;
    this.setState({ meds });
  };

  render() {
    const { selectedPatient } = this.state;

    const filtered =
      selectedPatient && selectedPatient._id
        ? this.state.meds.filter(m => m.patient._id === selectedPatient._id)
        : this.state.meds;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Link to="medicine/patients" className="btn btn-success">
              Настройки
            </Link>
            <ListGroup
              items={this.state.patients}
              allMeds={this.state.meds}
              selectedItem={this.state.selectedPatient}
              onItemSelect={this.handlePatientSelect}
            />
          </div>
          <div className="col">
            <h1>Прием лекарств</h1>
            <TimeTable meds={filtered} onClick={this.handleClick} />
            
            <Link to="medicine/medicine-list" className="btn btn-success">
              Аптечка
            </Link>
          </div>
          <div className="col-3">
            <Link to="medicine/new" className="btn btn-success">
              Добавить лекарство
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Meds;
