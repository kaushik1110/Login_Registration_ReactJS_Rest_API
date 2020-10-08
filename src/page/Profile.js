import React, { useEffect, useState } from "react";
import LoginSignup from "../auth/LoginSignup";
import Footer from "../common/Footer";
import Header from "../common/Header";
import axios from "axios";
import "../auth/Form.css";
const Profile = () => {
  const token = localStorage.getItem("login");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
  });
  // const[id,setId] = useState
  console.log(token);
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
    <div className="container-fluid">
      {token && (
        <div className="footer">
          <Header />
          <div className="row">
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
                className="text-white bg-dark w-75 ml-5 mt-3"
                
                // onClick={backHandler}
              >
                Edit Profile
              </button>
              
            </div>
            <div className="col-1"></div>
            <div className="col-5">
              <p className="mt-3 font-weight-bold text-xl-center ">Profile</p>
              <div className="border-welcome">
                <p className="text-center"> Welcome {profile.name}</p>
              </div>
              {/* <p className="text-center">Name : {profile.name}</p> */}
              <p className="text-center">Email : {profile.email}</p>
            </div>
            
          </div>
          <Footer />
        </div>
      )}
      {!token && <LoginSignup />}
    </div>
  );
};

export default Profile;

// import React from "react";
// import { Link } from "react-router-dom";
// import LoginSignup from "../auth/LoginSignup";

// function Profile() {
//   const obj = localStorage.getItem("login");
//   const onLogoutForm = () => {
//     localStorage.clear();
//   };
//   return (

// <div>
//       {obj && (
//         <div className="container">
//           <h2>Home Page</h2>
//           {/* <nav class="navbar navbar-inverse">
//         <div class="container-fluid">
//           <div class="navbar-header">
//             <a class="navbar-brand" href="#">
//               WebSiteName
//             </a>
//           </div>
//           <ul class="nav navbar-nav">
//             <li class="active">
//               <a href="#">Home</a>
//             </li>
//             <li>
//               <a href="#">Link</a>
//             </li>
//             <li>
//               <a href="#">Link</a>
//             </li>
//           </ul> */}
//           {/* </nav> */}
//         {/* </div> */}
//           <button class="btn btn-danger navbar-btn" onClick={onLogoutForm}>
//             <Link to="/">Logout</Link>
//           </button>

//         </div>
//       )}
//       {!obj && <LoginSignup />}
//     </div>
//   );
// }

// export default Profile;
