import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../auth/Form.css"


function Header() {
  const history = useHistory();

  const clickLogout = () => {
    localStorage.clear();
    history.push({
      pathname: "/",
    });
  };
  
  const homeHandler = () => {
    history.push({
      pathname: "/home",
    });
  }

  const profileHandler = () => {
    history.push({
      pathname: "/profile",
    });
  }

  const dashboardHandler = () => {
    history.push({
      pathname: "/dashboard",
    });
  }

  const recordHandler = () => {
    history.push({
      pathname: "/",
    });
  }

  return (
    <div>
      <Navbar bg="info" variant="dark">
        <Navbar.Brand onClick={homeHandler} href="#home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="text-light" onClick={profileHandler} href="#home">
            Profile
          </Nav.Link>
          <Nav.Link className="text-light" onClick={dashboardHandler} href="#dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link className="text-light" onClick={recordHandler}href="#record">
            Record
          </Nav.Link>
         
          <Button 
            className="button-right text-white bg-dark" 
            // style={{position: "absolute",
            //   right: "40px",}}
            onClick={clickLogout}
            variant="outline-info"
            >
            Logout
          </Button>
  
          
          
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
