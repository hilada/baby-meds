import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Войти</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Логин")}
          {this.renderInput("password", "Пароль", "", "password")}
          {this.renderButton("Войти")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
