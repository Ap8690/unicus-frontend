import axios from "axios";
import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAppearance } from "../../../../../Models/Appearance";
import { ISeo } from "../../../../../Models/Seo";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const RobotTxt = (seo: ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  const [excludeSite, setExcludeSite] = useState(false);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/seo`, seo);
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
              <h4>Robots.txt</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Robots Text</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Robots Text"
                  rows={5}
                />
              </Form.Group>
            </Col>
            <Col lg={6} className="mt-4">
              <SwitchWidget
                isChecked={excludeSite}
                setIsChecked={setExcludeSite}
                title={"Exclude site from search"}
                subtitle={
                  "Note: if the site is excluded from the search engine the content of the Robots.txt mentioned above will not be reflected in the Robots.txt`"
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RobotTxt;
