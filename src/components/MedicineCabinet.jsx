import React, { Component } from "react";
import { getMedsCollection } from "./../services/fakeMedsService";

class MedicineCabinet extends Component {
  state = {
    medsList: []
  };

  componentDidMount() {
    const medsList = getMedsCollection();

    this.setState({ medsList });
  }

  render() {
    return <h1>Аптечка</h1>;
    
  }

}

export default MedicineCabinet;
