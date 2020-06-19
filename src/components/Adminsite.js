import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import {db} from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { findByLabelText } from "@testing-library/react";

export default class Adminsite extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    //Magic authenticate Token =))
    if (
      token !=
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNDgwMDE0fQ.PnimktEu9sHSpyLUCwBTHH4kgfbNcpDxu4Z0oq-BeX0"
    ) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      questions: null,
    };
  }

  componentDidMount(){
      db.collection('questions')
      .get()
      .then(snapshot => {
          console.log(snapshot)
      })
      .catch(error=> console.log("hello my fen"))
  }

  render() {
    const cardStyles = {
      width: "auto",
      height: "auto",
      backgroundColor: "white",
      margin: "auto",
      display: "block",
      marginTop: "60px",
      opacity: 0.5,
      paddingTop: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      borderStyle: "outset",
      borderLeft: "50px solid black",
      borderRadius: "20px",
    };
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>This is admin site</h1>tete
        <Card style={cardStyles}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Link>
              <button class="Add-Button">Show questions</button>
            </Link>
            
          </div>
        </Card>
      </div>
    );
  }
}
