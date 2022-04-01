import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ISeo } from "../../../../../Models/Seo";
import { STOREFRONT_URL } from "../../../../../Utilities/Util";

const MetaTags = (seo: ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  useEffect(() => {
    setSeo(seo);
  }, [seo]);

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
              <h4>Meta Tags</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Meta Tags</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Meta Tags"
                  rows={5}
                />
              </Form.Group>
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

export default MetaTags;
