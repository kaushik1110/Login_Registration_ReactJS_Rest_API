import React from "react";
import "../auth/Form.css";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer font-small mdb-color lighten-3 pt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-2 col-lg-2 text-center mx-auto my-4">
              <h5 className="font-weight-bold text-uppercase mb-4">
                Follow Us
              </h5>
              <a>
                <i class="fa fa-linkedin fa-lg" aria-hidden="true"></i>
                <i class="fa fa-facebook-official ml-2 fa-lg" aria-hidden="true"></i>
                <i class="fa fa-instagram ml-2 fa-lg" aria-hidden="true"></i>
                <i class="fa fa-envelope ml-2 fa-lg" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://www.bluesoft.live/about.html"> BlueSoft.live</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
