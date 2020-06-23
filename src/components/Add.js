import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Navbar, Nav, Alert } from "react-bootstrap";
import { db } from "../Config.js";
import firebase from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class Add extends Component {
  constructor(props) {
    super(props);
    let islogin = false;
    const Login = localStorage.getItem("isLogin");
    if(Login=="Oke"){
      islogin = true;
    }
    this.state = {
      islogin,
      title: "",
      question: "",
      hint: "",
      optionC: "",
      optionI: "",
      answer: "",
      image: "",
      IMG: null
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        IMG: e.target.files[0],
      });
    }
    console.log(e.target.files[0]);
  };

  handleUpload = () => {
    alert("Vui lòng chờ cho đến khi ảnh được tải lên!");
    const level = localStorage.getItem("level");
    const { IMG } = this.state;
    const uploadTask = firebase
      .storage()
      .ref(`${level}/${IMG.name}`)
      .put(this.state.IMG);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot");
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref(level)
          .child(IMG.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              image: url,
            });
          });
      }
    );
  };
  componentDidMount(){
   
  }
  

  onSubmit = (e) => {
    const level = localStorage.getItem("level");
    e.preventDefault();  
    const{title, question, hint, optionC, optionI, answer, image} = this.state;
    if(title=='')
    {
      alert("Lỗi! Tiêu đề còn trống");
      return;
    }
    if(question=='')
    {
      alert("Lỗi! Câu hỏi còn trống");
      return;
    }
    if(hint=='')
    {
      alert("Lỗi! Gợi ý còn trống");
      return;
    }
    if(optionC==''||optionI==''||answer=='')
    {
      alert("Lỗi! Đáp án còn trống");
      return;
    }
    if(image=='')
    {
      alert("Lỗi! Chưa upload ảnh");
      return;
    }
    if(optionC!=answer&&optionI!=answer)
    {
      alert("Lỗi! Đáp án đúng không trùng với các đáp án lựa chọn! Hệ thống phân biệt chữ in hoa! Vui lòng kiểm tra lại");
      return;
    }
    


    db.collection(level).add({
      title, question, hint, optionC, optionI, answer, image
    }).then((docRef) => {
      this.setState({
        title: '',
        question: '', 
        hint: '', 
        optionC: '', 
        optionI: '',
        answer: '', 
        image: ''
      })
      this.props.history.push("/admin");
    })
    .catch((error) => {
      console.log("Error: ", error);
    })

  };

  render() {
    const {
      title,
      question,
      hint,
      optionC,
      optionI,
      answer,
      image,
      islogin,
    } = this.state;
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
   
    if (this.state.islogin==false) {
      return <Redirect to="/"/>;
    }
    return (
      <div>
        <Card style={cardStyles}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Link to="/admin">
              <button class="Add-Button">Trang chủ</button>
            </Link>
          </div>

          <div>
            <div class="form-group">
              <label for="title">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                name="title"
                value={title}
                onChange={this.onChange}
              ></input>
            </div>
            <div class="form-group">
              <label for="question">Nội dung câu hỏi</label>
              <textArea
                class="form-control"
                name="question"
                onChange={this.onChange}
                clos="80"
                rows="3"
              ></textArea>
            </div>

            <div class="form-group">
            <label for="hint">Gợi ý</label>
              <input
                type="text"
                class="form-control"
                name="hint"
                value={hint}
                onChange={this.onChange}
              ></input>
            </div>

            <div class="form-group">
            <label for="optionC">Đáp án 1</label>
              <input
                type="text"
                class="form-control"
                name="optionC"
                value={optionC}
                onChange={this.onChange}
              ></input>
            </div>

            <div class="form-group">
            <label for="optionI">Đáp án 2</label>
              <input
                type="text"
                class="form-control"
                name="optionI"
                value={optionI}
                onChange={this.onChange}
              ></input>
            </div>

            <div class="form-group">
            <label for="answer">Đáp án đúng</label>
              <input
                type="text"
                class="form-control"
                name="answer"
                value={answer}
                onChange={this.onChange}
              ></input>
            </div>

            <div className="upload-data">
              <input type="file" onChange={this.handleChange}></input>
              <img src={this.state.image} height="200" width="200" />
            </div>
            <div className="Buttons">
              <button class="Submit-Button" onClick={this.handleUpload}>
                Upload ảnh
              </button>
              <button class="Submit-Button" onClick={this.onSubmit}>
                Lưu
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Add;
