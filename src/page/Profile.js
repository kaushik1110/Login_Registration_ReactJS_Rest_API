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
  const token = localStorage.getItem("login");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    isEditSubmit: false,
  });

  const cityOption = [
    { key: "Select city", value: "" },
    { key: "Surat", value: "Surat" },
    { key: "Amdavad", value: "Amdavad" },
    { key: "Rajkot", value: "Rajkot" },
  ];
  const stateOption = [
    { key: "Select state", value: "" },
    { key: "Gujarat", value: "Gujarat" },
    { key: "Maharashtra", value: "Maharashtra" },
    { key: "Rajasthan", value: "Rajasthan" },
  ];
  const countryOption = [
    { key: "Select country", value: "" },
    { key: "India", value: "India" },
    { key: "US", value: "US" },
    { key: "Germany", value: "Germany" },
  ];
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
    name: "",
    address: "",
    selectOption: "",
    selectCity: "",
    selectState: "",
    genderOption: "",
    cityOption: "",
    stateOption: "",
    checkBoxOption: [],
    birthDate: null,
    fname: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required !"),
    address: Yup.string().required("Required !"),
    selectOption: Yup.string().required("Required !"),
    selectCity: Yup.string().required("Required !"),
    selectState: Yup.string().required("Required !"),
    genderOption: Yup.string().required("Required !"),
    cityOption: Yup.string().required("Required !"),
    stateOption: Yup.string().required("Required !"),
    checkBoxOption: Yup.array().required("Required !"),
    birthDate: Yup.date().required("Required !").nullable(),
    fname: Yup.string().required("Required !"),
  });

  const onSubmit = (values) => {
    console.log("submit data", values);
  };

  const editHandler = (event) => {
    // console.log("edit data", values);
    event.preventDefault();
    setProfile({
      ...profile,
      isEditSubmit: !profile.isEditSubmit,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_LINK}/test`, {
        headers: {
          "authentication-token": token,
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
  }, [1]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
                    className="text-white btn-dark w-75 ml-5 mt-3"
                    onClick={editHandler}
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
                    <p className="welcome text-center ">
                      Welcome {profile.name} !
                    </p>
                  </div>
                  {/* <p className="text-center">Email : {profile.email}</p> */}
                  {profile.isEditSubmit && (
                    <>
                      <Form className="form-border rounded mb-0">
                        <FormikControl
                          control="textarea"
                          label="Address"
                          name="address"
                        />
                        <FormikControl
                          control="radio"
                          label="Gender"
                          name="genderOption"
                          options={genderOption}
                        />
                        <FormikControl
                          control="input"
                          label="Pincode"
                          type="number"
                          fields={6}
                          name="name"
                        />
                        <FormikControl
                          control="select"
                          label="City"
                          name="selectCity"
                          options={cityOption}
                        />
                        <FormikControl
                          control="select"
                          label="State"
                          name="selectState"
                          options={stateOption}
                        />
                        <FormikControl
                          control="select"
                          label="Country"
                          name="selectOption"
                          options={countryOption}
                        />
                        <FormikControl
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

                        {/* <FormikControl
                      control="chakrainput"
                      label="Full name"
                      name="fname"
                    /> */}
                        <div className="buttonsubmit">
                          <button
                            className="textset text-white btn btn-dark mt-1"
                            type="submit"
                            // style={{float: 'right'}}
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
              <Footer />
            </div>
          )}
          {!token && <LoginSignup />}
        </div>
      )}
    </Formik>
  );
};

export default Profile;
