import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Home from "../page/Home";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import TextError from "./TextError";
import Profile from "../page/Profile";
const LoginSignup = () => {
  const [signIn, setSignIn] = useState({
    isLogin: false,
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const history = useHistory();

  const onSubmit = (value) => {
    axios
      .post(`http://localhost:3000/api/login`, value, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data);
        if (response.data) {
          setSignIn({
            isLogin: true,
          });
        }
        history.push({
          pathname: "/profile",
        });
      })
      .catch((error) => {
        toast.error("Enter valid Email and Password", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required !"),
    password: Yup.string().required("Required !"),
    // .min(8, "at least 8 chars")
    // .matches(/[a-z]/, "at least one lowercase char")
    // .matches(/[A-Z]/, "at least one uppercase char")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "One Number and one special case Character"
    // ),
  });
  const registerHandler = () => {
    history.push({
      pathname: "/signUp",
    });
  };
  const token = localStorage.getItem("token");
  // console.log(signIn);
  return (
    <div>
      {!token && (
        <div className="form ">
          <ToastContainer />
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {!signIn.isLogin && (
              <Form>
                <div className="container">
                  <div className="col-md-4 mb-3">
                    <h1> Login </h1>

                    <label className="form-label" style={{ fontSize: 20 }}>
                      Email:
                    </label>
                    <Field
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label" style={{ fontSize: 20 }}>
                      Password:
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </div>

                  <button
                    type="submit"
                    className="btn ml-3 btn-primary text-white"
                    onSubmit={(event) => onSubmit(event)}
                  >
                    Login
                  </button>
                  <button
                    className="btn ml-2 btn-primary"
                    onClick={registerHandler}
                  >
                    SignUp
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {token && <Home/>}
    </div>
  );
};

export default LoginSignup;
