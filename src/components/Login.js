import React, { Component } from "react";
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    let loggedIn = false;
    this.state = {
      username: "",
      password: "",
      loggedIn: "",
    };

    this.onChange=this.onChange.bind(this)
    this.submitForm=this.submitForm.bind(this)

  }

 

  onChange(e){
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  submitForm(e){
      e.preventDefault()
      const { username, password } = this.state
      //login magic =))
      if(username==="admin"&&password==="admin123"){
          localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNDgwMDE0fQ.PnimktEu9sHSpyLUCwBTHH4kgfbNcpDxu4Z0oq-BeX0")
          this.setState({
              loggedIn: true
          })
      }
  }

  render() {
      if(this.state.loggedIn){
          return <Redirect to ="/admin"/>
      }
    return <div>
        <h1>Login</h1>
        <form onSubmit={this.submitForm}>
            <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange}></input>
            <br/>
            <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            <br/>
            <input type="submit"></input>
            <br/>
        </form>
    </div>;
  }
}
