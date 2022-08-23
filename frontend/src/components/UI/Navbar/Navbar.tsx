import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Helpers/Assets/logo.png";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const NavbarBar = () => {
  return (
    <Navbar bg="body " variant="dark" expand="lg">
      <Container>
        <Link className="navbar-brand  fw-bolder" to="/videos">
          <img
            src={logo}
            className="d-inline-block align-text-top"
            width={30}
            height={24}
          />
          &nbsp;Digital Buddy
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ms-lg-5 ">
            <li className="nav-item px-2">
              <Link className="nav-link " to="/videos">
                Videos
                <span className="visually-hidden ">(current)</span>
              </Link>
            </li>

            <li className="nav-item px-2">
              <Link className="nav-link" to="/goals">
                Goals
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/diary">
                Diary
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/moviesSeries">
                Movies & Series
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/expenseTracker">
                Expense Tracker
              </Link>
            </li>
            <li className="nav-item dropdown nav-user ms-lg-5 ms-2">
              <a
                className="nav-link nav-user-img"
                href="#"
                id="navbarDropdownMenuLink2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="https://img.icons8.com/dusk/100/000000/user-female-circle.png"
                  alt=""
                  className="user-avatar-md rounded-circle"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right nav-user-dropdown bg-info"
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <Link
                  className="dropdown-item"
                  to={"/login"}
                  onClick={() => localStorage.clear()}
                >
                  <FontAwesomeIcon icon={faPowerOff} />&nbsp;
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBar;

