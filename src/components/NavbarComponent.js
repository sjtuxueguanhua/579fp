import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import React from 'react';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Star Gazer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Weather</Nav.Link>
            <Nav.Link as={Link} to="/nasa">NASA Today's Astronomy Picture</Nav.Link>
            <Nav.Link as={Link} to="/nasaData">NASA Coronal Mass Ejection (CME) Analysis</Nav.Link>
            <Nav.Link as={Link} to="/media">NASA Picture Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
