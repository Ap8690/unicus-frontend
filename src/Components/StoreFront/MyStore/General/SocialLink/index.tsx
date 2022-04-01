import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import fbLogo from "./../../../../../Assets/MyStore/fb-logo.svg"

const SocialLink = () => {
  const social1 = [
    { link: "", placeholder: "Enter Facebook url", logo: "" },
    { link: "", placeholder: "Enter Instagram url", logo: "" },
    { link: "", placeholder: "Enter Discord url", logo: "" },
    { link: "", placeholder: "Enter Pinterest url", logo: "" },
    { link: "", placeholder: "Enter Reddit url", logo: "" },
    { link: "", placeholder: "Enter Behnace url", logo: "" },
    { link: "", placeholder: "Enter Telegram url", logo: "" },
  ];
  const social2 = [
    { link: "", placeholder: "Enter LinkedIn url", logo: "" },
    { link: "", placeholder: "Enter Twitter url", logo: "" },
    { link: "", placeholder: "Enter Portfolio url", logo: "" },
    { link: "", placeholder: "Enter Youtube url", logo: "" },
    { link: "", placeholder: "Enter Dribble url", logo: "" },
    { link: "", placeholder: "Enter Stackoverflow url", logo: "" },
  ];
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Social Links</h4>
            </Col>
          </Row>
          <Row className="mt-4">
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
            <Col lg={12}>
              <Button variant="primary">Save Changes</Button>{" "}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SocialLink;