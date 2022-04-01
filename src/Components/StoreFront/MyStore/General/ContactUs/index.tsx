import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IGeneral } from "../../../../../Models/General";
import { STOREFRONT_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const ContactUs = (general: IGeneral) => {
  const [generals, setGeneral] = useState<IGeneral>(general);
  const [showNewsLetter, setShowNewsLetter] = useState(generals.showNewsLetter);
  const [showContactUs, setShowContactUs] = useState(generals.showContactUs);
  useEffect(() => {
    setGeneral(general);
  }, [general]);

  useEffect(() => {
    setGeneral({
      ...generals,
      showNewsLetter,
      showContactUs,
    });
  }, [showNewsLetter, showContactUs]);
  const handlePhone = (e) => {
    setGeneral({ ...generals, phone: e });
  };
  const handleContactEmail = (e) => {
    setGeneral({ ...generals, contactEmail: e });
  };
  const handleAddress = (e) => {
    setGeneral({ ...generals, address: e });
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(`${STOREFRONT_URL}/general`, generals);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err.response.data);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Contact Us</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone"
                  value={generals.phone}
                  onChange={(e) => handlePhone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={generals.contactEmail}
                  onChange={(e) => handleContactEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Address"
                  rows={5}
                  value={generals.address}
                  onChange={(e) => handleAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <h4>Toggle Settings</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showNewsLetter}
                setIsChecked={setShowNewsLetter}
                title={"Newsletter Subscription"}
                subtitle={
                  "Turn it on/off to show/hide the newsletter subscription section"
                }
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showContactUs}
                setIsChecked={setShowContactUs}
                title={"Contact Us"}
                subtitle={"Turn it on/off to show/hide the contact us section"}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="SaveChangesBtn">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
