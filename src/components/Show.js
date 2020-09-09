import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Navbar, Nav, Alert, Modal, Button } from "react-bootstrap";
import { db } from "../Config.js";
import firebase from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class Show extends Component {
  constructor(props) {
    super(props);
    let islogin = false;
    const Login = localStorage.getItem("isLogin");
    if (Login == "Oke") {
      islogin = true;
    }
    this.state = {
      islogin,
      question: [],
      key: "",
      title: "",
      show: false,
      setting: [],
    };
  }
  async componentDidMount() {
    try {
      const level = await localStorage.getItem("level");
      const ref = await firebase
        .firestore()
        .collection(level)
        .doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            question: doc.data(),
            key: doc.id,
            isLoading: false,
          });
        } else {
          console.log("No such document is here!");
        }
      });
    } catch (error) {}

    var setting = [];
    // get setting 
    await db.collection("settings")
    .get()
    .then(snapshot => {
        console.log(snapshot);
        snapshot.forEach(doc => {

            const data = doc.data();
            setting.push(data);
        })
        console.log(setting);
        this.setState({ setting: setting })
    })
    .catch(error => console.log(error));
  }
  async delete(id) {
    const level = await localStorage.getItem("level");
    if(this.state.question.answer=="Đáng tin"){
      if(this.state.setting[1].True<7){
        alert("Lỗi còn dưới dữ liệu cho phép");
        return;
      }
    }
    if(this.state.question.answer=="Không đáng tin"){
      if(this.state.setting[1].False<7){
        alert("Lỗi còn dưới dữ liệu cho phép");
        return;
      }
    }
    firebase
      .firestore()
      .collection(level)
      .doc(id)
      .delete()
      .then(() => {
        console.log("document delete successful");

        if(this.state.question.answer=="Đáng tin")
        {
          db.collection("settings").doc("Ue5P92W3Zu6rUzDJBIVo").update({
            True: this.state.setting[1].True-1,
        });
      }
      if(this.state.question.answer=="Không đáng tin")
      {
        db.collection("settings").doc("Ue5P92W3Zu6rUzDJBIVo").update({
          False: this.state.setting[1].False-1,
      });
    }
        this.props.history.push("/admin");
      })
      .catch((error) => {
        console.error("Error is: ", error);
      });
    // try {
    //   var desertRef = firebase.storage().refFromURL(this.state.question.image);
    //   desertRef
    //     .delete()
    //     .then(function () {
    //       console.log("file detelted");
        
    //     })
    //     .catch(function (error) {
    //       console.log("error while deleting the file");
    //     });
    // } catch (error) {}
  }
  hanleClose() {
    this.setState({
      show: false,
    });
  }
  hanleShow() {
    this.setState({
      show: true,
    });
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
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
    };

    if (this.state.islogin == false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Modal show={this.state.show} onHide={this.hanleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Cảnh báo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hanleClose.bind(this)}>
              Quay lại
            </Button>
            <Button
              variant="danger"
              onClick={this.delete.bind(this, this.state.key)}
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        <Card style={cardStyles}>
          <div className="Buttons">
            <Link to="/admin">
              <button class="Edit-Button">Trang chủ</button>
            </Link>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Title: </dt>
              <dd>{this.state.question.title}</dd>
            </dl>
            <Link
              to={`/edit/${this.state.key}`}
              class="btn btn-success"
              style={{ fontSize: 30 }}
            >
              Sửa
            </Link>
            <button
              onClick={this.hanleShow.bind(this)}
              style={{ marginLeft: "15rem", fontSize: 30 }}
              class="btn btn-danger"
            >
              Xóa
            </button>
          </div>
        </Card>
      </div>
    );
  }
}
export default Show;
