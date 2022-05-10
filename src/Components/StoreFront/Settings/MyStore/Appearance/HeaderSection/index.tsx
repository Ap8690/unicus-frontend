import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Row, Col, Button, Table, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IAppearance } from '../../../../../Models/Appearance';
import { BASE_URL } from '../../../../../Utilities/Util';

const HeaderSection = (appearance: IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
   useEffect(() => {
    setAppearance(appearance)
  }, [appearance])
  const headingLength = 50
  const headingDescriptionLength = 300
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/appearance`, Appearance);
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
              <h4>Header Section</h4>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12}>
              <Form.Group>
                <Form.Label>Heading</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Heading"
                  maxLength={headingLength}
                  value={Appearance.heading}
                  onChange={(e) =>
                    setAppearance({ ...Appearance, heading: e.target.value })
                  }
                />
              </Form.Group>
              <p style={{ float: "right" }}>
                {Appearance.heading ? Appearance.heading.length : "0"}/
                {headingLength}
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  rows={5}
                  maxLength={headingDescriptionLength}
                  value={Appearance.headerDescription}
                  onChange={(e) =>
                    setAppearance({
                      ...Appearance,
                      headerDescription: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <p style={{ float: "right" }}>
                {Appearance.headerDescription
                  ? Appearance.headerDescription.length
                  : "0"}
                /{headingDescriptionLength}
              </p>
            </Col>
          </Row>
          <Row className="mt-5 d-none">
            <Col lg={12}>
              <p>Buttons</p>
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Button</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>New Tab</th>
                    <th>Style</th>
                    <th>Show/Hide</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-5">
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

export default HeaderSection;