import React, { Component } from "react";
import classes from "./FrequencyInputPopup.module.css";

class FrequencyInputPopup extends Component {
  state = {
    amountOfTimes: 2,
    time: [9, 21]
  };


  handleFrequencyChoose = (event, time) => {
    let amountOfTimes = this.state.amountOfTimes;
    amountOfTimes = event.target.value;
    this.setState({ amountOfTimes, time: time });
  };

  renderTheTime = () => {
    const { amountOfTimes } = this.state;
    const startTime = 9;
    const endTime = 21;
    let selectedTimeList = [];
    if (amountOfTimes === 1) selectedTimeList.push(startTime);

    if (amountOfTimes >= 2) {
      let timeSpan = Math.floor((endTime - startTime) / (amountOfTimes - 1));
      let stepTime = startTime;
      let middleTimeList = [];
      for (let i = 0; i < amountOfTimes - 2; i++) {
        stepTime += timeSpan;
        middleTimeList.push(stepTime);
      }
      selectedTimeList = [startTime, ...middleTimeList, endTime];
    }

  }

  render() {
    const { amountOfTimes } = this.state;
    const startTime = 9;
    const endTime = 21;
    let selectedTimeList = [];
    if (amountOfTimes === 1) selectedTimeList.push(startTime);

    if (amountOfTimes >= 2) {
      let timeSpan = Math.floor((endTime - startTime) / (amountOfTimes - 1));
      let stepTime = startTime;
      let middleTimeList = [];
      for (let i = 0; i < amountOfTimes - 2; i++) {
        stepTime += timeSpan;
        middleTimeList.push(stepTime);
      }
      selectedTimeList = [startTime, ...middleTimeList, endTime];
     
    }


   
    return (
      <div>
        <div className="close" onClick={() => this.props.clicked(this.state.time)}>
          &times;
        </div>
        <h3>Частота приема</h3>

        <div className="input-group mb-3">
          <input
            type="number"
            className="text-center"
            id="frequencyPopup"
            name="frequencyPopup"
            min="1"
            max="10"
            value={this.state.amountOfTimes}
            onChange={(e) => this.handleFrequencyChoose(e, selectedTimeList)}
          />
          <div className="input-group-append">
            <span className="input-group-text">раз в день</span>
          </div>
        </div>
        <div className={classes.SelectedTime}>
          {selectedTimeList.map((num, index) => {
            return <span key={num}>{num + ":00"}</span>;
          })}
        </div>
        {/*<small>Нажмите на время, чтобы изменить его</small>*/}
        <span className="btn btn-success m-2 text-right" onClick={() => this.props.clicked(this.state.time)}>Готово</span>
      </div>
    );
  }
}

export default FrequencyInputPopup;
