import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Navbar, Nav, Alert } from "react-bootstrap";
import { db } from "../Config.js";
import firebase from "../Config.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  CKEditor  from '@ckeditor/ckeditor5-react';


class Add extends Component {
  constructor(props) {
    super(props);
    let islogin = false;
    const Login = localStorage.getItem("isLogin");
    if (Login == "Oke") {
      islogin = true;
    }
    this.state = {
      islogin,
      key: "",
      title: "",
      question: "",
      hint: "",
      optionC: "Đáng tin",
      optionI: "Không đáng tin",
      answer: "",
      image: "",
      IMG: null,
      explain: "",

    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleCKeditorChange = (e, editor) =>{
    const data = editor.getData();
    this.setState({
      question: data,
    });
  }

  handleCKeditorChange2 = (e, editor) =>{
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
  async componentDidMount() {
    try {
      const level = await localStorage.getItem("level");
      const ref = await firebase
        .firestore()
        .collection(level)
        .doc(this.props.match.params.id);
      ref.get().then((doc) => {
        if (doc.exists) {
          const document = doc.data();
          this.setState({
            key: doc.id,
            title: document.title,
            question: document.question,
            optionC: document.optionC,
            optionI: document.optionI,
            hint: document.hint,
            answer: document.answer,
            // image: document.image,
            explain: document.explain,

          });
        } else {
          console.log("No such document is here!");
        }
      });
    } catch (error) {}
  }
  handleDelete = () => {
    try {
      var desertRef = firebase.storage().refFromURL(this.state.image);
      desertRef
        .delete()
        .then(function () {
          console.log("file detelted");
        })
        .catch(function (error) {
          console.log("error while deleting the file");
        });
    } catch (error) {}
    this.setState({
      image: null,
    });
  };

  onSubmit = (e) => {
    const level = localStorage.getItem("level");
    e.preventDefault();
    const {
      title,
      question,
      hint,
      optionC,
      optionI,
      answer,
      image,
    } = this.state;
    if (title == "") {
      alert("Lỗi! Tiêu đề còn trống");
      return;
    }
    if (question == "") {
      alert("Lỗi! Câu hỏi còn trống");
      return;
    }
    if (optionC == "" || optionI == "" || answer == "") {
      alert("Lỗi! Đáp án còn trống");
      return;
    }
    // if (image == "") {
    //   alert("Lỗi! Chưa upload ảnh");
    //   return;
    // }
    if (optionC != answer && optionI != answer) {
      alert(
        "Lỗi! Đáp án đúng không trùng với các đáp án lựa chọn! Hệ thống phân biệt chữ in hoa! Vui lòng kiểm tra lại"
      );
      return;
    }
    const updateRef = db.collection(level).doc(this.state.key);
    updateRef.set({
        title,
        question,
        hint,
        optionC,
        optionI,
        answer,
        image,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          title: "",
          question: "",
          hint: "",
          optionC: "",
          optionI: "",
          answer: "",
          image: "",
        });
        this.props.history.push("/admin");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
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
              {/* <textArea
                class="form-control"
                name="question"
                onChange={this.onChange}
                clos="80"
                rows="3"
              >
                {question}
              </textArea> */}
                <CKEditor
              editor = {ClassicEditor}
              onInit = { editor => {
                //this inializes our application ///
                
              }} 
              config={{
                image: {
                  // Configure the available styles.
                  styles: [
                      'alignLeft', 'alignCenter', 'alignRight'
                  ],
      
                  // Configure the available image resize options.
                  resizeOptions: [
                      {
                          name: 'imageResize:original',
                          label: 'Original',
                          value: null
                      },
                      {
                          name: 'imageResize:50',
                          label: '50%',
                          value: '50'
                      },
                      {
                          name: 'imageResize:75',
                          label: '75%',
                          value: '75'
                      }
                  ],
      
                  // You need to configure the image toolbar, too, so it shows the new style
                  // buttons as well as the resize buttons.
                  toolbar: [
                      'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                      '|',
                      'imageTextAlternative'
                  ]
              },
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
                  'mediaEmbed', '|', 'undo', 'redo', '|', 'imageResize']
              }}
              data = {this.state.question}
              onChange={this.handleCKeditorChange}
              />
            </div>

            <div class="form-group">
              <label for="explain">Lời giải thích</label>
              <CKEditor
              editor = {ClassicEditor}
              onInit = { editor => {
                //this inializes our application ///
                
              }} 
              config={{
                image: {
                  // Configure the available styles.
                  styles: [
                      'alignLeft', 'alignCenter', 'alignRight'
                  ],
      
                  // Configure the available image resize options.
                  resizeOptions: [
                      {
                          name: 'imageResize:original',
                          label: 'Original',
                          value: null
                      },
                      {
                          name: 'imageResize:50',
                          label: '50%',
                          value: '50'
                      },
                      {
                          name: 'imageResize:75',
                          label: '75%',
                          value: '75'
                      }
                  ],
      
                  // You need to configure the image toolbar, too, so it shows the new style
                  // buttons as well as the resize buttons.
                  toolbar: [
                      'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                      '|',
                      'imageTextAlternative'
                  ]
              },
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
                  'mediaEmbed', '|', 'undo', 'redo', '|', 'imageResize']
              }}
              data = {this.state.explain}
              onChange={this.handleCKeditorChange2}
              />
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
                readOnly
                type="text"
                class="form-control"
                name="optionC"
                value={optionC}
              ></input>
            </div>

            <div class="form-group">
              <label for="optionI">Đáp án 2</label>
              <input
                readOnly
                type="text"
                class="form-control"
                name="optionI"
                value={optionI}
              ></input>
            </div>

            <div class="form-group">
              <label for="answer">Đáp án đúng</label>
              {/* <input
                type="text"
                class="form-control"
                name="answer"
                value={answer}
                onChange={this.onChange}
              ></input> */}
               <select
              name="answer"
              onChange={this.onChange}
              class="form-control"
              value = {answer}
              >
                <option value="Đáng tin">Đáng tin</option>
                <option value="Không đáng tin">Không đáng tin</option>
              </select>
            </div>

            {/* <div className="upload-data">
              <input type="file" onChange={this.handleChange}></input>
              <img src={this.state.image} height="200" width="200" />
            </div> */}
            <div className="Buttons">
              {/* <button class="Submit-Button" onClick={this.handleUpload}>
                Upload ảnh
              </button>
              <button class="Submit-Button" onClick={this.handleDelete}>
                Xóa ảnh
              </button> */}
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
