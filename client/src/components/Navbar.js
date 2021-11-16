import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootsrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";


const navApp = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Navbar bg='light' variant='dark' expand='lg'>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    Fitness Buddy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar'/>
                <Nav className="auto">
                {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Workouts
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
              </Nav>

            </Container>

        </Navbar>
       
      <Modal
      size='lg'
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby='signup-modal'>
      {/* tab container to do either signup or login component */}
      <Tab.Container defaultActiveKey='login'>
        <Modal.Header closeButton>
          <Modal.Title id='signup-modal'>
            <Nav variant='pills'>
              <Nav.Item>
                <Nav.Link eventKey='login'>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey='login'>
              <LoginForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
            <Tab.Pane eventKey='signup'>
              <SignUpForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>

       </> 
    );
};



export default navApp 