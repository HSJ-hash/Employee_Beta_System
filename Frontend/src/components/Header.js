import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../styles/header.css";
import logo from "../images/logo.png";
import Login from "./Login";

function Header({
  onFeaturesClick,
  onContactClick,
  onAboutClick,
  onHomeClick,
}) {
  const [openPopup, setOpenPopup] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={isScrolled ? "sticky" : "nav-bar"}>
        <Navbar expand="lg">
          <Container className="header-container">
            <Navbar.Brand href="#" onClick={onHomeClick}>
              <img
                alt="Logo"
                src={logo}
                className="d-inline-block align-top logo-header"
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="border-0 toggle-btn"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-center flex-grow-1 nav-items">
                <Nav.Link href="#" className="nav-links" onClick={onHomeClick}>
                  Home
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className="nav-links"
                  onClick={onFeaturesClick}
                >
                  Features
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className="nav-links"
                  onClick={onContactClick}
                >
                  Reviews
                </Nav.Link>
              
              </Nav>
              <Button
                variant="outline-light"
                onClick={() => {
                  setOpenPopup(true);
                }}
                className="header-btn register"
              >
                Login
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Login openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}

export default Header;
