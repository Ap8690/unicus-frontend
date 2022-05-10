import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import SwitchWidget from "../../SwitchWidget";
import placeholder from "./../../../../Assets/MyStore/placeholder-logo.svg"
import fbLogo from "./../../../../Assets/MyStore/fb-logo.svg"

import './GS.scss'


const GeneralSettings = () => {
  const [showNewsLetter, setShowNewsLetter] = useState(true);
  const [showContactUs, setShowContactUs] = useState(true);


  const social1 = [
    { link: "", placeholder: "Enter Facebook url", logo: "" },
    { link: "", placeholder: "Enter Instagram url", logo: "" },
    { link: "", placeholder: "Enter Discord url", logo: "" },
    
  ];
  const social2 = [
    { link: "", placeholder: "Enter LinkedIn url", logo: "" },
    { link: "", placeholder: "Enter Twitter url", logo: "" },
    { link: "", placeholder: "Enter Portfolio url", logo: "" },
   
  ];

  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>General Settings</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your Phone Number"/>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-1">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Username" />
              </Form.Group>
            </Col>
            <Col lg={6}>
            <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Email Address" />
              </Form.Group>
            </Col>
            </Row>

            <Row className="mt-1">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Avatar</Form.Label>
                <img src={placeholder} className="LogoImage"/>
              </Form.Group>
            </Col>
            <Col lg={6}>
            <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter your Bio here" />
              </Form.Group>
            </Col>
            </Row>
            
            
          
          
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Social Links</h4>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <Form>
                {social1.map((item) => (
                  <Form.Group className="mb-4 d-flex">
                    <img src={fbLogo} alt="" />
                    <Form.Control
                      type="text"
                      placeholder={item.placeholder}
                      className="ms-3"
                    />
                  </Form.Group>
                ))}
              </Form>
            </Col>
            <Col md={6}>
              <Form>
                {social2.map((item) => (
                  <Form.Group className="mb-4 d-flex">
                    <img src={fbLogo} alt="" />
                    <Form.Control
                      type="text"
                      placeholder={item.placeholder}
                      className="ms-3"
                    />
                  </Form.Group>
                ))}
              </Form>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
            <Button variant="primary">Save Changes</Button>{" "}
            </Col>
          </Row>
        </Col>
      </Row>  
    </div>
  );
};

    
export default GeneralSettings;