import axios from 'axios';
import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { IAdvance } from '../../../../../Models/Advance';
import { BASE_URL } from '../../../../../Utilities/Util';

const SiteUrl = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/advance`, advance);
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
              <h4>Site URLs</h4>
              <p>
                Note: You can check latest custom url setup instruction here
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={6}>
              <Form.Group className="mb-4">
                <Form.Label>Select Primary URL</Form.Label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Button variant="primary">Add New URL</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SiteUrl;