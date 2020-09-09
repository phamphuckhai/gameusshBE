import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Navbar, Nav, Alert, } from "react-bootstrap";
import { db } from "../Config.js";
import firebase from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Label } from "reactstrap";


class Detail extends Component {
    constructor(props) {
        super(props);
        let islogin = false;
        const Login = localStorage.getItem("isLogin");
        if (Login == "Oke") {
            islogin = true;
        }
        this.state = {
            islogin,
            questions: [],
            setting: [],
            trueN: 0,
            falseN: 0,

        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleCKeditorChange = (e, editor) => {
        const data = editor.getData();
        this.setState({
            question: data,
        });
    }

    handleCKeditorChange2 = (e, editor) => {
        const data = editor.getData();
        this.setState({
            explain: data,
        });
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                IMG: e.target.files[0],
            });
        }
        console.log(e.target.files[0]);
    };


    async componentDidMount() {
        var questions = [];

        const level = localStorage.getItem("level");
        // await db.collection(colecItem)
        await db.collection(level)
            .get()
            .then(snapshot => {
                console.log(snapshot);
                snapshot.forEach(doc => {

                    const data = doc.data();
                    questions.push(data);
                })
                console.log(questions);
                this.setState({ questions: questions })
            })
            .catch(error => console.log(error));
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

                this.setState({ setting: setting })
               
            })
            .catch(error => console.log(error));
            this.setState({ 
                trueN: this.state.setting[1].True,
                falseN: this.state.setting[1].False,
            })
    }
    onSubmit = (e) => {

    };

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
        if (this.state.islogin == false) {
            return <Redirect to="/" />;
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
                            <button class="Add-Button">Quay lại</button>
                        </Link>
                    </div>

                    <fieldset>
                        <legend>Thông tin cơ sở dữ liệu: </legend>
                        <Label for="totalQ">Tổng số câu hỏi là: </Label>
                        <input
                            readOnly
                            type="text"
                            class="form-control"
                            name="totalQ"
                            value={this.state.questions.length}
                        ></input>
                        <Label for="TrueQ">Số câu đúng là: </Label>
                        <input
                            readOnly
                            type="text"
                            class="form-control"
                            name="TrueQ"
                            value={this.state.trueN}
                        ></input>
                        <Label for="FalseQ">Số câu đúng là: </Label>
                        <input
                            readOnly
                            type="text"
                            class="form-control"
                            name="FalseQ"
                            value={this.state.falseN}
                        ></input>
                    </fieldset>
                </Card>
            </div>
        );
    }
}

export default Detail;
