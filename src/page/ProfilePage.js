import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import "../auth/Form.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    isEditSubmit: false,
  });
  // const [data,setData]=useState(faLSE);
  const [editField, setEditField] = useState({
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

  const [info, setInfo] = useState({
    address: "",
    gender: "",
    birthdate: "",
    country: "",
    state: "",
    city: "",
    hobby: [],
    zip: "",
  });

  const token = localStorage.getItem("token");

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

    axios
      .get(`${process.env.REACT_APP_LINK}/api/addUserInfo/getdata`, {
        headers: {
          "authentication-token": `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setInfo({
          address: response.data.address,
          gender: response.data.gender,
          birthdate: response.data.birthdate,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
          hobby: response.data.hobby,
          zip: response.data.zip,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [profile.name, profile.email, profile.image, info]);

  useEffect(() => {
    {
      getData &&
        getData.country &&
        axios
          .post(`http://localhost:8000/${getData.country}`)
          .then((response) => {
            {
              response &&
                response.data &&
                setEditField({
                  ...editField,
                  stateSelect: response.data,
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
    {
      getData &&
        getData.state &&
        axios
          .post(`http://localhost:8000/${getData.country}/${getData.state}`)
          .then((response) => {
            debugger;
            {
              response &&
                response.data &&
                setEditField({
                  ...editField,
                  citySelect: response.data,
                });
            }
          })
          .catch((error) => {
            debugger;
            console.log(error);
          });
    }
  }, [getData.country, getData.state]);

  const editButtonHandler = () => {
    setProfile({
      ...profile,
      isEditSubmit: true,
    });
    {
      info &&
        info.address &&
        setGetData({
          address: info.address,
          gender: info.gender,
          birthdate: info.birthdate,
          country: info.country,
          state: info.state,
          city: info.city,
          hobby: info.hobby,
          zip: info.zip,
        });
    }
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

  const editFormHandler = (event) => {
    setGetData({
      ...getData,
      [event.target.name]: event.target.value,
    });
  };

  const hobbyHandler = (event) => {
    setGetData({
      ...getData,
      hobby: [...getData.hobby, event.target.value],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const isValid = { validate }
    // if (isValid) {

    axios
      .post(`http://localhost:3000/api/addUserInfo`, getData, {
        headers: {
          "authentication-token": `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setGetData({
          isEdit: false,
          isInfo: false,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
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
                <form
                  className="form"
                  role="form"
                  onSubmit={(event) => submitHandler(event)}
                >
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
                  <div className="ml-0 mb-0 form-group row" onChange={editFormHandler}>
                    <label>Gender</label>
                    <div className="radioButton form-group row">
                      <div className="form-check form-check-inline ">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="Male"
                          />
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
                          />
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
                            
                          />
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
                      <select
                        className="form-control"
                        name="country"
                        size="0"
                        onChange={editFormHandler}
                      >
                        {editField.countrySelect.map((countryname, index) => {
                          return (
                            <option key={index} value={countryname.code}>
                              {countryname.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      State
                    </label>
                    <div className="col-lg-9">
                      <select
                        className="form-control"
                        name="state"
                        size="0"
                        onChange={editFormHandler}
                      >
                        <option key="" value="">
                          Select a option
                        </option>
                        {editField.stateSelect.map((statename, index) => {
                          return (
                            <option key={index} value={statename}>
                              {statename}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                      City
                    </label>
                    <div className="col-lg-9">
                      <select
                        className="form-control"
                        name="city"
                        size="0"
                        onChange={editFormHandler}
                      >
                        <option key="" value="">
                          Select a option
                        </option>
                        {editField.citySelect.map((cityname, index) => {
                          return (
                            <option key={index} value={cityname}>
                              {cityname}
                            </option>
                          );
                        })}
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
                          Sport
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
                      {/* <input
                        type="button"
                        className="text-white bg-dark btn btn-outline-info"
                        value="Save Changes"
                        // onClick={() => onSubmit()}
                      /> */}
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {info.address && (
            <div className="block mt-5 p-3">
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label ">Address:</label>
                </div>
                <div className="col-10">{info.address}</div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label cf">Gender: </label>
                </div>
                <div className="col-10 " onChange={editFormHandler}>
                  <div className="form-check-inline ml-2">
                    <label className="form-check-label ">{info.gender}</label>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label">Date of birth: </label>
                </div>
                <div className="col-10">{info.birthdate}</div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label">Country: </label>
                </div>
                <div className="col-10">{info.country}</div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label">State: </label>
                </div>
                <div className="col-10">{info.state}</div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label">City: </label>
                </div>
                <div className="col-10">{info.city}</div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label cf">Hobbies: </label>
                </div>
                <div className="col-10">
                  <div className="form-check-inline">
                    <label className="form-check-label ml-2">
                      {info.hobby}
                    </label>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-2">
                  <label className="form-label">Pincode</label>
                </div>
                <div className="col-10">{info.zip}</div>
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
