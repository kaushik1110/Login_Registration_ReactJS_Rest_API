import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../page/Home";
import { useFormik } from "formik";

function SignUpFormik() {
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (value) => {
    console.log(value);
    axios
      .post("http://localhost:3000/api/", value)
      .then((response) => {
        if (response.data === "Email is Already Exist") {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          history.push({
            pathname: "/",
          });
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const loginHandler = () => {
    history.push({
      pathname: "/",
    });
  };

  const obj = localStorage.getItem("token");
  console.log("visited field", formik.touched);
  return (
    <div>
      {!obj && (
        <div className="form">
          <ToastContainer />
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="col-md-4 mb-3">
                <h2>Registration</h2>
                <label style={{ fontSize: 20 }}>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <label style={{ fontSize: 20 }}>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="col-md-4 mb-3">
                <label style={{ fontSize: 20 }}>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="btn ml-3 btn-primary text-white">
                SingUp
              </button>
              <button
                type=""
                className="btn ml-2 btn-primary"
                onClick={loginHandler}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
      {obj && <Home />}
    </div>
  );
}

export default SignUpFormik;
