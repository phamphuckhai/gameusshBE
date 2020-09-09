import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Adminsite from "./components/Adminsite";
import Add from "./components/Add.js"
import Edit from "./components/Edit.js"
import Show from "./components/Show.js"
import Detail from "./components/Detail.js"


class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Login}/>
        <Route exact path = "/admin" component ={Adminsite}/>
        <Route path = "/create" component={Add}/>
        <Route path = "/show/:id" component={Show}/>
        <Route path = "/edit/:id" component={Edit}/>
        <Route path = "/detail" component={Detail}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
