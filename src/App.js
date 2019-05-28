import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import MedsForm from "./components/MedsForm";
import NotFound from "./components/NotFound";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Meds from "./components/Meds";
import PatientForm from "./components/PatientForm";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/medicine/patients" component={PatientForm} />
            <Route path="/medicine/:id" component={MedsForm} />
            <Route path="/medicine" component={Meds} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/medicine" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
