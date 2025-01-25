import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const isActive = (paths: string[]) =>
    paths.includes(location.pathname) ? "active" : "";
  return (
    <Navbar color="dark" dark expand="lg">
      <NavbarBrand href="/" className="mx-4">
        Project Name
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/home" className={isActive(["/", "/home"])}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/product-list"
              className={isActive(["/product-list"])}
            >
              Products
            </NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <NavItem>
            <NavLink href="/logout" className="text-white">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
