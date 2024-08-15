import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Auth from '../utils/auth';

function Navbar() {
  return (
    <>
    <nav className="navbarmargintop">
      <Nav defaultActiveKey="/home">
        <h1 className="titlespace">Dogalogue</h1>
        <Nav.Item className="button">
          <Nav.Link href="/">Dog House</Nav.Link>
        </Nav.Item>
        <Nav.Item className="button">
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item className="button">
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
        <Nav.Item className="button">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item className="button" onClick={() => Auth.logout}>
          <Nav.Link onClick={() => Auth.logout}>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </nav>
    </>
  );
}

export default Navbar;