import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../page/Profile";
// import Home from "../page/Home";

const LoginSignup = () => {
  const [login, setlogin] = useState({
    detail: {
      email: "",
      password: "",
    },
    isLogin: false,
  });
  const token = localStorage.getItem("token");
  const history = useHistory();

  const onSubmitForm = (event) => {
    console.log(process.env.REACT_APP_LINK);
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/login", login.detail)
      .then((response) => {
        console.log(response);
        localStorage.setItem("login", response.data);
        if (response.data) {
          setlogin({
            ...login,
            isLogin: true,
          });
          history.push({
            pathname: "/profile",
          });
        }
      })
      .catch((error) => {
        toast("Enter valid Email and Password", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const formChangeHandler = (event) => {
    setlogin({
      ...login,
      detail: {
        ...login.detail,
        [event.target.name]: event.target.value,
      },
    });
  };

  const signUpHandler = () => {
    history.push({
      pathname: "/signUp",
    });
  };
  return (
    <div>
    {!token && (
        <div className="form ">
          <ToastContainer />
          <form onSubmit={(event) => onSubmitForm(event)}>
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
                  value={login.detail.email}
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
                  value={login.detail.password}
                  onChange={(event) => formChangeHandler(event)}
                />
              </div>
              <button
                type="submit"
                className="btn ml-3  btn-primary text-white"
              >
                Login
              </button>
              <button
                type=""
                className="btn ml-2 btn-primary"
                onClick={signUpHandler}
              >
                SignUp
              </button>
              <p className="message ml-3">Not registered? Create an account</p>
            </div>
          </form>
        </div>
      )}
      {token && <Profile />}
   </div>
  );
};

export default LoginSignup;