import axios from "axios";
import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { ISeo } from "../../../../../Models/Seo";
import { STOREFRONT_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const RSS = (seo: ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  const [toggleCollection, setToggleCollection] = useState(false);
  const [toggleAssets, setToggleAssets] = useState(false);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${STOREFRONT_URL}/seo`, seo);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
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
              <h4>RSS Feed</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Row>
                <Col>
                  <h4>Collections RSS Feed</h4>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Collections RSS feed Title"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Collections RSS feed URL"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Collections RSS feed description"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} className="mt-4 pt-2">
                  <SwitchWidget
                    isChecked={toggleCollection}
                    setIsChecked={setToggleCollection}
                    title={"Collections Feed"}
                    subtitle={"You can check collections feed here"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Row>
                <Col>
                  <h4>Assets RSS Feed</h4>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Assets RSS feed Title"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Assets RSS feed URL"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>RSS Feed Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Assets RSS feed description"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} className="mt-4 pt-2">
                  <SwitchWidget
                    isChecked={toggleAssets}
                    setIsChecked={setToggleAssets}
                    title={"Assets Feed"}
                    subtitle={"You can check assets feed here"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RSS;
