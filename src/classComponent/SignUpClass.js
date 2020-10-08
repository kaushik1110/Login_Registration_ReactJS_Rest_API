import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class SignUpClass extends Component {
  state = {
    register: {
      name: "",
      email: "",
      password: "",
    },
  };
  onSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/", this.state.register)
      .then((response) => {
        // toast.error(response.data, {
        //     position: toast.POSITION.TOP_LEFT
        // });
        if (response.data === "Email is Already Exist") {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          this.setState({
            ...this.state,
            register: {
              name: "",
              email: "",
              password: "",
            },
          });
          this.props.history.push(`/`);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  formChangeHandler = (event) => {
    this.setState({
      ...this.state,
      register: {
        ...this.state.register,
        [event.target.name]: event.target.value,
      },
    });
  };

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:3000/api/")
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({ register: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  render() {
    return (
      <div className="form">
        <form onSubmit={(e) => this.onSubmitForm(e)}>
          <div className="container">
            <div className="col-md-4 mb-3">
              <h2>Registration</h2>
              <label style={{ fontSize: 20 }}>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                required
                value={this.state.register.name}
                onChange={(event) => this.formChangeHandler(event)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label style={{ fontSize: 20 }}>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                required
                value={this.state.register.email}
                onChange={(event) => this.formChangeHandler(event)}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label style={{ fontSize: 20 }}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                value={this.state.register.password}
                onChange={(event) => this.formChangeHandler(event)}
              />
            </div>
            <div className="form-group form-check ml-3">
              <input type="checkbox" className="form-check-input " />
              <label className="form-check-label">Check me out</label>
            </div>
            <button
              type="submit"
              className="btn ml-3 btn-primary text-white"
              //   onClick={(event) => this.onSubmitForm(event)}
            >
              SignUp
            </button>
            <button type="submit" className="btn  text-white">
              <Link to="/">Back</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpClass;
