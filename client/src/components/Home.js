import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import './home.css';


const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#"><b>Attendance System</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">


            <Form className="d-flex ml-auto">
              <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Container className="welcome-message">
        <h1>Welcome to the Attendance System</h1>
      </Container> */}

      <div className="background-image">
        <div className="welcome-message">
          <h1>Welcome to the Attendance System</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
