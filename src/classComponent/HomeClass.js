import React, { Component } from "react";
import { Link } from "react-router-dom";

export class HomeClass extends Component {
  clickLogout = () => {
    localStorage.clear();
  };
  obj = localStorage.getItem("token");

  render() {
    return (
      <div className="container">
        {this.obj && (
          <div>
            <p>Home Page</p>
            <button className="btn " onClick={clickLogout}>
              <Link to="/">Logout</Link>
            </button>
          </div>
        )}
        {!this.obj && <Login />}
      </div>
    );
  }
}

export default HomeClass;
