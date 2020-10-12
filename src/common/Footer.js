import React from "react";
import "../auth/Form.css";

const Footer = () => {
  return (
    <div className="footercolor">
      <footer className="page-footer font-small mdb-color lighten-3 pt-4 py-3">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-2 col-lg-2 text-center mx-auto my-2">
              <h5 className="font-weight-bold text-uppercase">
                Follow Us
              </h5>
              <a>
                <i className="fa fa-linkedin fa-lg fa-2x" aria-hidden="true"></i>
                <i className="fa fa-facebook-official fa-lg fa-2x fa-fw" aria-hidden="true"></i>
                <i className="fa fa-instagram fa-lg fa-2x fa-fw" aria-hidden="true"></i>
                <i className="fa fa-envelope  fa-lg fa-2x fa-fw" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center">
          © 2020 Copyright:
          <a href="https://www.bluesoft.live/about.html"> BlueSoft.live</a>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
