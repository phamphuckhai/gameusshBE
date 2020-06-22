import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Navbar, Nav } from "react-bootstrap";
import { db } from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class Adminsite extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = false;
    //Magic authenticate Token =))
    if (
      token ===
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkyNDgwMDE0fQ.PnimktEu9sHSpyLUCwBTHH4kgfbNcpDxu4Z0oq-BeX0"
    ) {
      loggedIn = true;
      localStorage.setItem("isLogin","Oke");
    }


    this.state = {
      questions: [],
      unsubscribe: null,
      level: '',
    };
  }

  async componentDidMount() {
    const level = localStorage.getItem("level");
    const unsubscribe = await db.collection(level).onSnapshot(this.onCollectionUpdate);
    this.setState({
      unsubscribe,
      level
    })
  }

  swapLevel = (selectedKey) =>  {
    var {level} = this.state;
    if(selectedKey=='#Level1'){
      level='questions';
      localStorage.setItem("level", "questions1");
    }
    else if(selectedKey=='#Level2')
    {
      level='questions1';
      localStorage.setItem("level", "questions1");
    }
    else if(selectedKey=='#Level3')
    {
      level='questions2';
      localStorage.setItem("level", "questions2");
    }
    else if(selectedKey=='#Level4')
    {
      level='questions3';
      localStorage.setItem("level", "questions3");
    }
    else if(selectedKey=='#Level5')
    {
      level='testBE';
      localStorage.setItem("level", "testBE");
    }
    var unsubscribe = db.collection(level).onSnapshot(this.onCollectionUpdate);
    this.setState({
      unsubscribe,
      level
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      const {
        answer,
        hint,
        image,
        optionC,
        optionI,
        question,
        title,
      } = doc.data();
      questions.push({
        key: doc.id,
        doc,
        answer,
        hint,
        image,
        optionC,
        optionI,
        question,
        title,
      });
    });

    this.setState({
      questions,
    });
  };

  defaultKey() {
    const level = localStorage.getItem("level");
    if(level=="questions")
    {
      return "#Level1"
    }else  if(level=="questions1")
    {
      return "#Level2"
    }
    else  if(level=="questions2")
    {
      return "#Level3"
    }
    else  if(level=="questions3")
    {
      return "#Level4"
    }
    else  if(level=="testBE")
    {
      return "#Level5"
    }
  }

  render() {
    const cardStyles = {
      width: "auto",
      height: "auto",
      backgroundColor: "white",
      margin: "auto",
      display: "block",
      marginTop: "60px",
      paddingTop: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      borderRadius: "20px",
    };
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          ADMIN SITE
        </h1>
        <Navbar expand="lg" bg="dark" variant="dark" onSelect={(selectedKey) => this.swapLevel(selectedKey)} style={{size:100}}>
          <Navbar.Brand>Mức độ</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" defaultActiveKey={this.defaultKey}>
              <Nav.Link href="#Level1">Cực dễ</Nav.Link>
              <Nav.Link href="#Level2">Dễ</Nav.Link>
              <Nav.Link href="#Level3">Trung bình</Nav.Link>
              <Nav.Link href="#Level4">Khó</Nav.Link>
              <Nav.Link href="#Level5">Cực khó</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Card style={cardStyles}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Link to = "/create">
              <button class="Add-Button">Thêm câu hỏi</button>
            </Link>
          </div>
          <div class="container">
            <div class="panel panel-heading" style={{ marginLeft: 450 }}>
              <h3>Danh sách câu hỏi</h3>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Câu hỏi</th>
                  <th>Gợi ý</th>
                  <th>Đáp án 1</th>
                  <th>Đáp án 2</th>
                  <th>Đáp án đúng</th>
                  <th>Hình ảnh</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map((question) => (
                  <tr>
                    <td>
                      <Link to={`/show/${question.key}`}>{question.title}</Link>
                    </td>
                    <td>{question.question}</td>
                    <td>{question.hint}</td>
                    <td>{question.optionC}</td>
                    <td>{question.optionI}</td>
                    <td>{question.answer}</td>
                    <td>
                      <img
                        src={question.image}
                        width="100px"
                        height="100px"
                        alt="image"
                      ></img>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }
}
