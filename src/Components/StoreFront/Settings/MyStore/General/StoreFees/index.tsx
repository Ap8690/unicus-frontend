import { IGradientFadeEffecModel } from "@cloudinary/url-gen/internal/models/IEffectActionModel";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IGeneral } from "../../../../../../Models/General";
import { BASE_URL } from "../../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const StoreFees = (general: IGeneral) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>(general);
    useEffect(() => {
      setGeneral(general);
    }, [general]);

    const handleSave = async () => {
      try {        
        const res = await axios.post(`${BASE_URL}/general`, generals);
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
              <h4>Store Fees</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <Form.Group className="">
                <Form.Label>Store Fees</Form.Label>
                <Row>
                  <Col xs={10} sm={10} lg={10}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={generals.storeFees}
                      onChange={(e) =>
                        setGeneral({
                          ...generals,
                          storeFees: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col xs={2} sm={2} lg={2} className="ps-0">
                    <Form.Control type="text" value="%" disabled />
                  </Col>
                </Row>
                <Form.Text>
                  Revenue percentage to be shared with this store.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="">
                <Form.Label>Secondary Store Fees</Form.Label>
                <Row>
                  <Col xs={10} sm={10} lg={10}>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={generals.secondaryStoreFees}
                      onChange={(e) =>
                        setGeneral({
                          ...generals,
                          secondaryStoreFees: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col xs={2} sm={2} lg={2} className="ps-0">
                    <Form.Control type="text" value="%" disabled />
                  </Col>
                </Row>{" "}
                <Form.Text>
                  Revenue percentage to be shared with this store.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6}>
              <Form.Group className="">
                <Form.Label>Store Wallet</Form.Label>
                <Form.Control type="number" placeholder="0" />
                <Form.Text>
                  Store fees will be collected in this wallet
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StoreFees;
