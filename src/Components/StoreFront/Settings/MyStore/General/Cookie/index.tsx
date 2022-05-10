import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IGeneral } from "../../../../../../Models/General";
import { BASE_URL } from "../../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const Cookies = (general: IGeneral) => {
    const [generals, setGeneral] = useState<IGeneral>(general);
  const [showCookieConsent, setShowCookieConsent] = useState(generals.showCookieConsent);
    useEffect(() => {
      setGeneral(general);
    }, [general]);
    useEffect(() => {
      setGeneral({
        ...generals,
        showCookieConsent,
      });
    }, [showCookieConsent]);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/general`, generals);
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
              <h4>Cookies Consent</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Cookie Consent</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Consent Text"
                  rows={6}
                  value={generals.cookieConsentText}
                  onChange={(e) =>
                    setGeneral({
                      ...generals,
                      cookieConsentText: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Row>
                <Col lg={12}>
                  <Form.Group className="mb-4 d-flex flex-column">
                    <Form.Label>More Info Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://www.example.com/cookie-policy"
                      value={generals.cookieInfoLink}
                      onChange={(e) =>
                        setGeneral({
                          ...generals,
                          cookieInfoLink: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  <SwitchWidget
                    isChecked={showCookieConsent}
                    setIsChecked={setShowCookieConsent}
                    title={"Enable Cookie Consent"}
                    subtitle={"Cookie files are used to analyze web traffic"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cookies;
