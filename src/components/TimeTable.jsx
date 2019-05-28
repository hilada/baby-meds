import React, { Component } from "react";
import { Link } from "react-router-dom";
import Thumb from "./common/Thumb";

class TimeTable extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Время приема</th>
            <th>Название лекарства</th>
            <th>Принял</th>
          </tr>
        </thead>
        <tbody>
          {this.props.meds.map(m => (
            <tr key={m._id}>
              <td />
              <td>
                <div className="card-body">
                  <h5 className="card-title">{m.title}</h5>
                  <h6 className="card-subtitle">{m.patient.name}</h6>
                  <p className="card-text">{m.dose}</p>
                  <Link to={`/medicine/${m._id}`} className="card-link">
                    Изменить
                  </Link>
                </div>
              </td>
              <td>
                <Thumb token={m.token} onClick={() => this.props.onClick(m)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TimeTable;
