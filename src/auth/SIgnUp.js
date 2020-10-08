import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../page/Home";

const SignUp = () => {
  const [SignUp, setSignUp] = useState({
    register: {
      name: "",
      email: "",
      password: "",
    },
  });
  const obj = localStorage.getItem("login");
  const history = useHistory();
  const onSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/", SignUp.register)
      .then((response) => {
        if (response.data === "Email is Already Exist") {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          setSignUp({
            ...SignUp,
            register: {
              name: "",
              email: "",
              password: "",
            },
          });
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const formChangeHandler = (event) => {
    setSignUp({
      ...SignUp,
      register: {
        ...SignUp.register,
        [event.target.name]: event.target.value,
      },
    });
  };
  const loginHandler = () => {
    history.push({
      pathname: "/",
    });
  };
  return (
    <div>
      {!obj && (
        <div className="form">
          <ToastContainer />
          <form onSubmit={(e) => onSubmitForm(e)}>
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
                  value={SignUp.register.name}
                  onChange={(event) => formChangeHandler(event)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label style={{ fontSize: 20 }}>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={SignUp.register.email}
                  required
                  onChange={(event) => formChangeHandler(event)}
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
                  value={SignUp.register.password}
                  onChange={(event) => formChangeHandler(event)}
                />
              </div>
              <button
                type="submit"
                className="btn ml-3 btn-primary text-white"
                //   onClick={(event) => this.onSubmitForm(event)}
              >
                SignUp
              </button>
              <button type="" className="btn ml-2 btn-primary"
              onClick={loginHandler}
              >
                Back
                {/* <Link to="/">Back</Link> */}
              </button>
            </div>
          </form>
        </div>
      )}
      {obj && <Home />}
    </div>
  );
};

export default SignUp;
