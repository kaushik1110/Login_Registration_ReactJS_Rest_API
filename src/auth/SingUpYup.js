import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Home from "../page/Home";
import { Formik, useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

function SingUpYup() {
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: [""],
    uploadImage: "",
    selectedFile: null,
  };
  const [image, setImage] = useState();
  const onSubmit = (value) => {
    const singUpImage = new FormData();
    singUpImage.append("file", image);
    singUpImage.append("name", value.name);
    singUpImage.append("email", value.email);
    singUpImage.append("password", value.password);

    axios
      .post("http://localhost:3000/api/", singUpImage)
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
  const validationSchema = Yup.object({
    // name: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email format").required("Required"),
    // password: Yup.string()
    //   .required("Invalid password format")
    //   .required("Required"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Required !"),
    // comments: Yup.string().required("Required"),
    // address: Yup.string().required("Required"),
    // uploadImage: Yup.string().required("Required"),
  });
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  // });

  const loginHandler = () => {
    history.push({
      pathname: "/",
    });
  };

  const fileUploadHandler = (event) => {
    setImage(event.target.files[0]);
  };

  // const uploadHandler = () => {
  //   const singUpImage = new FormData();
  //   singUpImage.append("image", Image.selectedFile, Image.selectedFile.name);
  //   axios
  //     .post("http://localhost:3000/api/", singUpImage)
  //     // onUploadProgress: ProgressEvent => {
  //     //    console.log('Upload Progress: '+ (ProgressEvent.loaded / ProgressEvent.total*100) + '%');
  //     // }
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  // const obj = localStorage.getItem("login");
  // console.log("visited field", formik.touched);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="form">
            <ToastContainer />
            <Form>
              <div className="container">
                <div className="col-md-4 mb-3">
                  <h2>Registration</h2>

                  <label style={{ fontSize: 20 }}>Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="name"
                    component={TextError}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Email address</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Upload Image: </label>
                  <Field name="file" type="file" onChange={fileUploadHandler} />
                  {/* <ErrorMessage name="uploadImage">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage> */}
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Comments</label>
                  <Field
                    as="textarea"
                    // type="password"
                    id="comments"
                    name="comments"
                    className="form-control"
                    placeholder="Enter comments"
                  />
                  <ErrorMessage name="comments">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-md-4 mb-3">
                  <label style={{ fontSize: 20 }}>Address</label>
                  <Field name="address">
                    {(props) => {
                      const { field, form, meta } = props;
                      console.log("render props", props);
                      return (
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            {...field}
                          />
                          {meta.touched && meta.error ? (
                            <div style={{ color: "red" }}>{meta.error}</div>
                          ) : null}
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage name="address">
                    {(errorMsg) => (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="facebook" style={{ fontSize: 20 }}>
                    Facebook profile
                  </label>
                  <Field
                    type="text"
                    id="facebook"
                    className="form-control"
                    name="social.facebook"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="twitter" style={{ fontSize: 20 }}>
                    Twitter profile
                  </label>
                  <Field
                    type="text"
                    id="twitter"
                    className="form-control"
                    name="social.twitter"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="primaryPh" style={{ fontSize: 20 }}>
                    Primary Phone No.
                  </label>
                  <Field
                    type="tel"
                    id="primaryPh"
                    className="form-control"
                    name="phoneNumbers[0]"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="secondaryPh" style={{ fontSize: 20 }}>
                    Secondary Phone No.
                  </label>
                  <Field
                    type="tel"
                    id="secondaryPh"
                    className="form-control"
                    name="phoneNumbers[1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="btn ml-3 btn-primary text-white"
                >
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
export default SingUpYup;
