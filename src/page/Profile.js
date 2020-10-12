import React, { useEffect, useState } from "react";
import LoginSignup from "../auth/LoginSignup";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import * as Yup from "yup";
import FormikControl from "../common/FormikControl";
import { Formik, Form } from "formik";
import "../auth/Form.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    isEditSubmit: false,
  });
  const [editField, setEditField] = useState({
    countrySelect: [],
    stateSelect: [],
  });

  const token = localStorage.getItem("login");

  // const editChangeHandler = (event) => {
  //   setEditField({
  //       ...editField,
  //       [event.target.name]: event.target.value,
  //   });
  // };

  useEffect(() => {
    // API-1
    axios
      .get(`${process.env.REACT_APP_LINK}/test`, {
        headers: {
          "authentication-token": `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProfile({
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profile.name, profile.email, profile.image]);

  // const cityOption = [
  //   { key: "Select city", value: "" },
  //   { key: "Surat", value: "Surat" },
  //   { key: "Amdavad", value: "Amdavad" },
  //   { key: "Rajkot", value: "Rajkot" },
  // ];

  const genderOption = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
  ];
  const hobbyOptions = [
    { key: "Option 1", value: "Option 1" },
    { key: "Option 2", value: "Option 2" },
    { key: "Option 3", value: "Option 3" },
  ];
  const initialValues = {
    address: "",
    pincode: "",
    selectCountry: "",
    selectCity: "",
    selectState: "",
    genderOption: "",
    cityOption: "",
    checkBoxOption: [],
    birthDate: null,
  };

  const validationSchema = Yup.object({
    address: Yup.string().required("Required !"),
    // selectCountry: Yup.string().required("Required !"),
    // selectCity: Yup.string().required("Required !"),
    // selectState: Yup.string().required("Required !"),
    genderOption: Yup.string().required("Required !"),
    pincode: Yup.string().required("Required !"),
    checkBoxOption: Yup.array().required("Required !"),
    birthDate: Yup.date().required("Required !").nullable(),
  });

  const editButtonHandler = () => {
    setProfile({
      ...profile,
      isEditSubmit: !profile.isEditSubmit,
    });
    // API-2 Country Data
    axios
      .get(`http://localhost:8000`)
      .then((res) => {
        console.log(res.data);
        debugger;
        setEditField({
          countrySelect: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stateData = (value) => {
    debugger;
    console.log(value);
    // API-3
    axios
      .post(`http://localhost:8000/${value}`)
      .then((res) => {
        debugger;
        setEditField({
          stateSelect: res && res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = (values) => {
    console.log("submit data", values);
    // debugger;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onSubmit()}
    >
      {(formik) => (
        <div>
          {token && (
            <div className="footer">
              <Header />
              <div className="Bgcolor row">
                <div className="col-1"></div>
                <div className="col-2">
                  <img
                    src={`${profile.image}`}
                    width="304"
                    height="236"
                    className="mt-3 rounded-circle float-left"
                    alt="image not found"
                  ></img>
                  <button
                    type=""
                    className="text-white btn-dark w-75  ml-4 mt-3 "
                    onClick={editButtonHandler}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="col-1"></div>
                <div className="col-5">
                  <p className="profile mt-3 font-weight-bold text-xl-center ">
                    Profile
                  </p>
                  <div className="border-welcome">
                    <p className="welcome text-center">
                      Welcome {profile.name} !
                    </p>
                  </div>
                  {/* <p className="text-center">Email : {profile.email}</p> */}
                  {profile.isEditSubmit && (
                    <>
                      <Form className="form-border rounded mb-0">
                        <FormikControl
                          className="boxsize"
                          control="textarea"
                          label="Address"
                          name="address"
                        />
                        <FormikControl
                          // className="boxsize"
                          control="radio"
                          label="Gender"
                          name="genderOption"
                          options={genderOption}
                        />
                        <FormikControl
                          className="boxsize"
                          control="input"
                          name="pincode"
                          label="Pincode"
                          type="text"
                          name="pincode"
                        />
                        <FormikControl
                          className="boxsize"
                          control="select"
                          label="Country"
                          name="selectCountry"
                          countryData={stateData}
                          options={editField.countrySelect}
                        />

                        {/* <FormikControl
                          className="boxsize"
                          control="select"
                          label="State"
                          name="selectState"
                          countryData={stateData}
                          options={editField.stateSelect}
                        /> */}

                        {/* <FormikControl
                        className="boxsize"
                          control="select"
                          label="City"
                          name="selectCity"
                          options={cityOption}
                        /> */}
                        <FormikControl
                          className="boxsize"
                          control="date"
                          label="Birthdate"
                          name="birthDate"
                        />
                        <FormikControl
                          control="checkbox"
                          label="Hobby"
                          name="checkBoxOption"
                          options={hobbyOptions}
                        />
                        <div className="buttonsubmit">
                          <button
                            className="textset text-white btn btn-dark mt-1"
                            type="submit"
                            // onSubmit={() => onSubmit()}
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </>
                  )}

                  {/* </> */}
                </div>
              </div>
              <div className="footerPosition">
                <Footer />
              </div>
            </div>
          )}
          {!token && <LoginSignup />}
        </div>
      )}
    </Formik>
  );
};

export default Profile;
