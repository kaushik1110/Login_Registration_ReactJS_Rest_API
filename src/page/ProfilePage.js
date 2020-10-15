import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import * as Yup from "yup";
import "../auth/Form.css";

const ProfilePage = () => {
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
    hobby: [],
    zip: "",
    country: "",
    state: "",
    city: "",
  });

  const token = localStorage.getItem("login");

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

  
  // const stateData = (value) => {
  //   // API-3 State Data
  //   {
  //     !editField.country &&
  //       axios
  //         .post(`http://localhost:8000/${value}`)
  //         .then((res) => {
  //           console.log(res.data);
  //           setEditField({
  //             ...editField,
  //             stateSelect: res.data,
  //             country: value,
  //           });
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }

  //   // API-4 City Data
  //   {
  //     editField.country &&
  //       axios
  //         .post(`http://localhost:8000/${editField.country}/${value}`)
  //         .then((res) => {
  //           {
  //             setEditField({
  //               ...editField,
  //               citySelect: res.data,
  //               state: value,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }
  // };

  const editFormHandler = (event) => {
    setGetData({
      ...getData,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value);
  };

  const hobbyHandler = (event) => {
    setGetData({
      ...getData,
      hobby: [...getData.hobby, event.target.value],
    });
  };
  console.log(getData);
  const onSubmit = (value) => {
    console.log(value);
    debugger;
    // axios
    //   .post(`http://localhost:3000/api/addUserInfo`, getData, {
    //     headers: {
    //       "authentication-token": `${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     setGetData({
    //       address: response.data.address,
    //       gender: response.data.gender,
    //       birthdate: response.data.birthdate,
    //       hobby: response.data.hobby,
    //       zip: response.data.zip,
    //       country: response.data.country,
    //       state: response.data.state,
    //       city: response.data.city,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div>
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
            <div className="form-border mt-sm-3 card card-outline-secondary">
              <div className="card-body">
                <form className="form" role="form">
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      Address
                    </label>
                    <div className="col-lg-9">
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        placeholder="Enter Your Address"
                        onChange={editFormHandler}
                      />
                    </div>
                  </div>
                  <div className="ml-0 mb-0 form-group row">
                    <label>Gender</label>
                    <div className="radioButton form-group row">
                      <div className="form-check form-check-inline ">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={editFormHandler}
                          />{" "}
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={editFormHandler}
                          />{" "}
                          Female
                        </label>
                      </div>
                      <div className="form-check form-check-inline disabled">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="gender"
                            disabled=""
                            onChange={editFormHandler}
                          />{" "}
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      Pincode
                    </label>
                    <div className="col-lg-9">
                      <input
                        className="form-control"
                        type="number"
                        name="zip"
                        placeholder="Enter Pincode"
                        onChange={editFormHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      Country
                    </label>
                    <div className="col-lg-9">
                      <select className="form-control" name="country" size="0">
                        {editField.countrySelect.map((countryname, index) => (
                          <option key={index} value={countryname.code}>
                            {countryname.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      State
                    </label>
                    <div className="col-lg-9">
                      <select className="form-control" name="state" size="0">
                      {editField.stateSelect.map((statename, index) => (
                          <option key={index} value={statename.code}>
                            {statename.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      City
                    </label>
                    <div className="col-lg-9">
                      <select className="form-control" name="city" size="0">
                        <option onChange={editFormHandler}></option>
                        {/* <option onChange={editFormHandler}>Amdavad</option>
                        <option onChange={editFormHandler}>Rajkot</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      Date
                    </label>
                    <div className="col-lg-9">
                      <input
                        className="form-control"
                        type="date"
                        name="birthdate"
                        onChange={editFormHandler}
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-lg-3">
                      <label className="form-label cf">Hobbies: </label>
                    </div>
                    <div className="col-lg-9 mt-0">
                      <div className="form-check-inline">
                        <label className="form-check-label ml-2">
                          <input
                            type="checkbox"
                            value="Reading"
                            className=" mr-2"
                            name="hobby"
                            onChange={hobbyHandler}
                          />
                          Cricket
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label ml-2">
                          <input
                            type="checkbox"
                            value="Music"
                            className=" mr-2"
                            name="hobby"
                            onChange={hobbyHandler}
                          />
                          Music
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label ml-2">
                          <input
                            type="checkbox"
                            value="Playing game"
                            className=" mr-2"
                            name="hobby"
                            onChange={hobbyHandler}
                          />
                          Traveling
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label"></label>
                    <div className="col-lg-9">
                      <input
                        type="button"
                        className="text-white bg-dark btn btn-outline-info"
                        value="Save Changes"
                        onClick={() => onSubmit()}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ProfilePage;
