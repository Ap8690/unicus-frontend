import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IGeneral } from "../../../../../Models/General";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const BasicSettings = (general: IGeneral) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>(general);
  const [showInSuperMarket, setShowInSuperMarket] = useState(generals.showInSuperMarket);
  const [marketPlaceAsHome, setMarketPlaceAsHome] = useState(generals.marketPlaceAsHome);
  const [showLanguage, setShowLanguage] = useState(generals.showLanguage);
  useEffect(() => {
    setGeneral(general);    
  }, [general]);

  useEffect(() => {
    
    setGeneral({ ...generals, showInSuperMarket, marketPlaceAsHome, showLanguage });
  }, [showInSuperMarket, marketPlaceAsHome,showLanguage]);

  const dateFormats=[
    {value:"DD MMM, YYYY", text:""},
]
//     <option selected="" value="D MMM, YYYY">
//       3 Sep, 2022
//     </option>
//     <option value="DD MMM, YYYY">03 Sep, 2022</option>
//     <option value="MMM D, YYYY">Sep 3, 2022</option>
//     <option value="MMM DD, YYYY">Sep 03, 2022</option>
//     <option value="D MMMM, YYYY">3 September, 2022</option>
//     <option value="DD MMMM, YYYY">03 September, 2022</option>
//     <option value="MMMM D, YYYY">September 3, 2022</option>
//     <option value="MMMM DD, YYYY">September 03, 2022</option>
//     <option value="M/D/YY">9/3/22</option>
//     <option value="M/D/YYYY">9/3/2022</option>
//     <option value="MM/DD/YY">09/03/22</option>
//     <option value="MM/DD/YYYY">09/03/2022</option>
//     <option value="M-D-YY">9-3-22</option>
//     <option value="M-D-YYYY">9-3-2022</option>
//     <option value="MM-DD-YY">09-03-22</option>
//     <option value="MM-DD-YYYY">09-03-2022</option>
//     <option value="D/M/YY">3/9/22</option>
//     <option value="D/M/YYYY">3/9/2022</option>
//     <option value="DD/MM/YY">03/09/22</option>
//     <option value="DD/MM/YYYY">03/09/2022</option>
//     <option value="D-M-YY">3-9-22</option>
//     <option value="D-M-YYYY">3-9-2022</option>
//     <option value="DD-MM-YY">03-09-22</option>
//     <option value="DD-MM-YYYY">03-09-2022</option>
//     <option value="YY/M/D">22/9/3</option>
//     <option value="YYYY/M/D">2022/9/3</option>
//     <option value="YY/MM/DD">22/09/03</option>
//     <option value="YYYY/MM/DD">2022/09/03</option>
//     <option value="YY-M-D">22-9-3</option>
//     <option value="YYYY-M-D">2022-9-3</option>
//     <option value="YY-MM-DD">22-09-03</option>
//     <option value="YYYY-MM-DD">2022-09-03</option>

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
              <h4>Basic Settings</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6} className="d-none">
              <SwitchWidget
                isChecked={showInSuperMarket}
                setIsChecked={setShowInSuperMarket}
                title={"Show my Stores's NFTs in Unicus Marketplace"}
                subtitle={
                  "Turn this ON if you want to show your NFTs in Unicus Marketplace"
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <SwitchWidget
                isChecked={marketPlaceAsHome}
                setIsChecked={setMarketPlaceAsHome}
                title={"Set Marketplace page as Homepage"}
                subtitle={
                  "Turn this ON if you want to use Marketplace page as Homepage"
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="d-none">
              <SwitchWidget
                isChecked={showLanguage}
                setIsChecked={setShowLanguage}
                title={"Show Language Change Button"}
                subtitle={
                  "Turn this ON if you want to show Marketplace language switch button"
                }
              />
            </Col>
          </Row>
          <Row className="d-none">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Locale</Form.Label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Time Zone</Form.Label>
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
          <Row className="d-none">
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Date Format</Form.Label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-4 d-flex flex-column">
                <Form.Label>Time Format</Form.Label>
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

export default BasicSettings;
