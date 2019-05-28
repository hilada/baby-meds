import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Логин"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Пароль"),
    name: Joi.string()
      .required()
      .label("Имя пользователя")
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Регистрация</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Логин")}
          {this.renderInput("password", "Пароль", "", "password")}
          {this.renderInput("name", "Имя пользователя")}
          {this.renderButton("Зарегистрироваться")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
