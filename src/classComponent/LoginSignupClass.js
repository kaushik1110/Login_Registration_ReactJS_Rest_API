import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class LoginSignupClass extends Component {
  state = {
    detail: {
      email: "",
      password: "",
      errors: {},
    },
  };
  validate = () => {
    // debugger;
    const { email, passsword } = this.state.detail;
    let isvalid = true;
    const errors = {};
    if (!this.state.detail.email.includes("@")) {
      errors.this.state.detail.email = "email must have @";
      isvalid = false;
    }
    if (this.state.detail.password.trim().length < 8) {
      errors.passwordLength = "password must be of length 8 or higher";
      isvalid = false;
    }
    this.setState(this.state.details.errors);
  };
  onSubmitForm = (event) => {
    const isValid = this.validate();
    if (isValid) {
      axios
        .post("http://localhost:3000/api/login", this.state.detail)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("login", response.data);
          this.setState({
            ...this.state,
            detail: {
              email: "",
              password: "",
            },
          });
          this.props.history.push("/");
          console.log(this.state);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  formChangeHandler = (event) => {
    this.setState({
      ...this.state,
      detail: {
        ...this.state.detail,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    const { email, password, errors } = this.state.detail;
    return (
      <div className="form">
        {/* form start */}
        <form>
          <div className="container">
            <div className="col-md-4 mb-3">
              <h2>Login</h2>
              <label style={{ fontSize: 20 }}>Email address</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter email"
                required
                value={this.state.detail.email}
                onChange={(event) => this.formChangeHandler(event)}
              />
              <div style={{ color: "red" }}>{this.state.detail.emailError}</div>
            </div>
            <div className="col-md-4 mb-3">
              <label style={{ fontSize: 20 }}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                value={this.state.detail.password}
                onChange={(event) => this.formChangeHandler(event)}
              />
              <div style={{ color: "red" }}>
                {this.state.detail.passwordError}
              </div>
            </div>
            <div className="form-group form-check ml-3">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Check me out</label>
            </div>
            <button
              type="submit"
              className="btn ml-3 btn-primary text-white"
              onClick={(event) => this.onSubmitForm(event)}
            >
              Login
            </button>
            <button type="" className="btn text-white">
              <Link to="/SignUp">Sign Up</Link>
            </button>
            <p className="message">Not registered? Create an account</p>
          </div>
          {Object.keys(errors).map((key) => {
            return (
              <div style={{ color: "red" }} key={key}>
                {errors[key]}
              </div>
            );
          })}
        </form>
        {/* form end */}
      </div>
    );
  }
}

export default LoginSignupClass;
