import React from "react";
import { Link } from "react-router-dom";
import LoginSignup from "../auth/LoginSignup";
import Header from "../common/Header";

function Home() {
  const obj = localStorage.getItem("login");

  const onLogoutForm = () => {
    localStorage.clear();
  };

  return (
    <div>
      {obj ? (
        <div className="footer">
          <div>
          <Header />
          </div>
          <h2>Home Page</h2>
          <button className="btn  text-white" onClick={onLogoutForm}>
            <Link to="/">Logout</Link>
          </button>
        </div>
      ) : (
        <LoginSignup />
      )}
    </div>
  );
}

export default Home;
