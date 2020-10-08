import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
  
  return (
    <div>
      <Navbar bg="info" variant="dark">
        <Navbar.Brand href="#home">Profile</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="text-light" href="#home">
            Home
          </Nav.Link>
          <Nav.Link className="text-light" href="#features">
            Dashboard
          </Nav.Link>
          <Nav.Link className="text-light" href="#pricing">
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
