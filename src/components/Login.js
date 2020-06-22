import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import '../App.css';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FacebookLoginButton } from "react-social-login-buttons";

export default class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      username: "",
      password: "",
      loggedIn: "",
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    //login magic =))
    if (username === "admin" && password === "admin123") {
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNDgwMDE0fQ.PnimktEu9sHSpyLUCwBTHH4kgfbNcpDxu4Z0oq-BeX0"
      );
      localStorage.setItem("level", "questions");
      this.setState({
        loggedIn: true,
      });
    }
    else{
        alert("Sai tài khoản hoặc mật khẩu!! Vui lòng nhập lại");
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/admin" />;
    }
    return (
    <div id="App">
      <Form onSubmit={this.submitForm} >
        <h1>
          <span className="font-weight-bold">ĐĂNG NHẬP</span>
        </h1>
        <Input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
        ></Input>
        <br />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        ></Input>
        <br />
        <Input type="submit" value="Đăng Nhập"></Input>
        <br />
      </Form>
      </div>
    );
  }
}
