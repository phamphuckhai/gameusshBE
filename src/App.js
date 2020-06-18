import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Adminsite from "./components/Adminsite";

class App extends Component {
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Login}/>
        <Route exact path = "/admin" component ={Adminsite}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
