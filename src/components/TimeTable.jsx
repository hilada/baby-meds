import React, { Component } from "react";
import { Link } from "react-router-dom";
import Thumb from "./common/Thumb";
import moment from "moment";

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
          {this.props.meds.map(m => {
            let currentDate = moment().format("YYYY-MM-DD");
            if (currentDate >= m.startDate && currentDate <= m.endDate)
              return m.frequency.map(num => {
                return (
                  <tr key={m._id + num}>
                    <td>{num}:00</td>
                    <td>
                      <h5 className="card-title">{m.title}</h5>
                      <h6 className="card-subtitle">{m.patient.name}</h6>
                      <p className="card-text">{m.dose}</p>

                      <Link to={`/medicine/${m._id}`} className="card-link">
                        Изменить
                      </Link>
                    </td>
                    <td className="text-center">
                      <Thumb
                        style={{ textAlign: "center" }}
                      
                      />
                    </td>
                  </tr>
                );
              });
          })}
        </tbody>
      </table>
    );
  }
}

export default TimeTable;
