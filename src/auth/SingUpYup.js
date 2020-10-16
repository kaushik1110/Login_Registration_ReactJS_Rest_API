import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
// import { Dimmer, Loader, Segment, Image } from "semantic-ui-react";
// import { BallBeat } from "react-pure-loaders";

function SingUpYup() {
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // uploadImage: "",
    selectedFile: null,
  };
  const [image, setImage] = useState({
    file: null,
    loading: true,
  });
  const onSubmit = (value) => {
    const singUpImage = new FormData();
    singUpImage.append("file", image.file);
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
    // <div>
    //   <BallBeat color={"#123abc"} loading={image.loading} />
    // </div>;
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required !"),
    email: Yup.string().email("Invalid email format").required("Required !"),
    password: Yup.string()
      // .min(8, "at least 8 chars")
      // .matches(/[a-z]/, "at least one lowercase char")
      // .matches(/[A-Z]/, "at least one uppercase char")
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "at least 1 number and special char (@,!,#, etc)."
      // )
      .required("Required !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required !"),
    // uploadImage: Yup.string().required("Required !"),
  });

  const loginHandler = () => {
    history.push({
      pathname: "/",
    });
  };

  const fileUploadHandler = (event) => {
    // setImage(event.target.files[0]);
    setImage({
      file: event.target.files[0],
      //   // file: URL.createObjectURL(event.target.files[0]),
    });
  };

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
                  {
                    image.file && (
                      // ? (
                      <img
                        src={URL.createObjectURL(image.file)}
                        className="image-size"
                      />
                    )
                    // ) : (
                    //   <ErrorMessage name="uploadImage">
                    //     {(errorMsg) => (
                    //       <div style={{ color: "red" }}>{errorMsg}</div>
                    //     )}
                    //   </ErrorMessage>
                    // )
                  }
                </div>

                <button
                  type="submit"
                  // disabled={!formik.isValid || formik.isSubmitting}
                  onSubmit={() => onSubmit()}
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
                {/* <div>
                  <BallBeat color={"#123abc"} loading={image.loading} />
                </div> */}
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
export default SingUpYup;
