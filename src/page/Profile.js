import React, { useEffect, useState } from "react";
// import LoginSignup from "../auth/LoginSignup";
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
    state: "",
    country: "",
    city: "",
    countrySelect: [],
    stateSelect: [],
    citySelect: [],
  });
  const [getData, setGetData] = useState({
    address: "",
    gender: "",
    birthdate: "",
    hobby: "",
    zip: "",
    country: "",
    state: "",
    city: "",
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
          ...profile,
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profile.name, profile.email, profile.image]);

  const genderOptions = [
    { key: "male", value: "male" },
    { key: "female", value: "female" },
    { key: "other", value: "other" },
  ];
  const hobbyOptions = [
    { key: "Option 1", value: "Option 1" },
    { key: "Option 2", value: "Option 2" },
    { key: "Option 3", value: "Option 3" },
  ];

  const initialValues = {
    // address: "",
    // zip: "",
    // selectCountry: "",
    // selectCity: "",
    // selectState: "",
    // genderOption: "",
    // checkBoxOption: [],
    // birthDate: null,
    address: "",
    gender: "",
    hobby: "",
    birthdate: "",
    zip: "",
    country: "",
    state: "",
    city: "",
  };

  const validationSchema = Yup.object({
    address: Yup.string().required("Required !"),
    // country: Yup.string().required("Required !"),
    // state: Yup.string().required("Required !"),
    // city: Yup.string().required("Required !"),
    gender: Yup.string().required("Required !"),
    hobby: Yup.array().required("Required !"),
    birthdate: Yup.date().required("Required !").nullable(),
    zip: Yup.string().matches(/^[0-9]{6}$/, 'Must be 6 Digits').required("Required !").length(6),
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
        setEditField({
          ...editField,
          countrySelect: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stateData = (value) => {
    // API-3 State Data
    {
      !editField.country &&
        axios
          .post(`http://localhost:8000/${value}`)
          .then((res) => {
            console.log(res.data);
            setEditField({
              ...editField,
              stateSelect: res.data,
              country: value,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // API-4 City Data
    {
      editField.country &&
        axios
          .post(`http://localhost:8000/${editField.country}/${value}`)
          .then((res) => {
            {
              setEditField({
                ...editField,
                citySelect: res.data,
                state: value,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  const stateCountryData = (value) => {
    setEditField({
      ...editField,
      city: value,
    });
  };

  const onSubmit = (value) => {
    let data = {
      address: value.address,
      gender: value.gender,
      hobby: value.hobby,
      birthdate: value.birthdate,
      zip: value.zip,
      country: value.country,
      state: value.state,
      city: value.city,
    };
    debugger
    axios
      .post(`http://localhost:3000/api/addUserInfo`, data, {
        headers: {
          "authentication-token": `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setGetData({
          address: response.data.address,
          gender: response.data.gender,
          birthdate: response.data.birthdate,
          hobby: response.data.hobby,
          zip: response.data.zip,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="footer">
      <Header />
      <div className="Bgcolor row">
        <div className="col-1"></div>
        <div className="col-2">
          <div>
            <img
              src={`${profile.image}`}
              width="304"
              height="236"
              className="mt-3 rounded-circle float-left"
              alt="image not found"
            ></img>
          </div>
          <button
            type=""
            className="text-white btn-dark w-75  ml-4 mt-3 "
            onClick={editButtonHandler}
          >
            Edit Profile
          </button>
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <p className="profile mt-3 font-weight-bold text-xl-center ">
            Profile
          </p>
          <div className="border-welcome">
            <p className="welcome text-center">Welcome {profile.name} !</p>
          </div>
          {profile.isEditSubmit && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
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
                    name="gender"
                    options={genderOptions}
                  />
                  <FormikControl
                    className="boxsize"
                    control="input"
                    name="zip"
                    label="Pincode"
                  />
                  <FormikControl
                    className="boxsize"
                    control="select"
                    label="Country"
                    name="country"
                    countryData={stateData}
                    options={editField.countrySelect}
                  />

                  <FormikControl
                    className="boxsize"
                    control="select"
                    label="State"
                    name="state"
                    countryData={stateData}
                    options={editField.stateSelect}
                  />

                  <FormikControl
                    className="boxsize"
                    control="select"
                    label="City"
                    name="city"
                    countryData={stateCountryData}
                    options={editField.citySelect}
                  />
                  <FormikControl
                    className="boxsize"
                    control="date"
                    label="Birthdate"
                    name="birthdate"
                  />
                  <FormikControl
                    control="checkbox"
                    label="Hobby"
                    name="hobby"
                    options={hobbyOptions}
                  />
                  <div className="buttonsubmit">
                    <button
                      className="textset text-white btn btn-dark mt-1"
                      type="submit"
                      onSubmit={() => onSubmit()}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
