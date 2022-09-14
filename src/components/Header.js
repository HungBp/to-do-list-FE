import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import ModalWrapper from '../components/ModalWrapper';
import LoginForm from './LoginForm';

function Header() {
  return (
    <Navbar bg="light" sticky="top" collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand>TodoApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar"/>
        <Navbar.Collapse id="responsive-navbar">
          <Nav fill className="flex-grow-1 flex-wrap" variant="tabs">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/">TODO</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="/a">CALENDAR</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="/b">REMINDER</Nav.Link>
            </Nav.Item>
            <Nav.Item>

              <Nav.Link as={NavLink} to="/c">BUDGET</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="/d">PERSONAL</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="/trash">TRASH</Nav.Link>
            </Nav.Item>
          </Nav>

          <ModalWrapper title="Login">
            <LoginForm/>
          </ModalWrapper>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;