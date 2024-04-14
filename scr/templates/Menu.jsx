import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React from "react";


export default function Menu(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='mt-0'>
      <Container>
      <LinkContainer to="/"><Navbar.Brand >Início</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <NavDropdown title="Formulário de Inscrição" id="collapsible-nav-dropdown">
              <LinkContainer to="/cadastroCandidatos"><NavDropdown.Item >Inscrições</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

