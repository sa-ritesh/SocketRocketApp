import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Header(props) {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink active href="#">
            Chat Room
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            Live Visitors
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Header;
