import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import UserContext from "../context/context";
import history from "../history";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  function checkLoginStatus() {
    console.log(userData);
  }

  const logout = () => {
    setUserData({
      isLoggedIn: false,
    });
    console.log(userData);
    localStorage.removeItem("auth-token");
    history.push("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">TechoKids</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#login" as={Link} to="/login">
            LoginPage
          </Nav.Link>
          <Nav.Link href="#register" as={Link} to="/register">
            Register
          </Nav.Link>
          <Nav.Link href="#teacherdashboard" as={Link} to="/teacher/dashboard">
            Teacher Dashboard
          </Nav.Link>
          <Nav.Link href="#studentdashboard" as={Link} to="/Student/dashboard">
            Student Dashboard
          </Nav.Link>
          <Nav.Link
            href="#logout"
            as={Link}
            to="/login"
            onClick={() => logout()}
          >
            LogOut
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
