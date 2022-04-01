import axios from "axios";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAdvance } from "../../../../../Models/Advance";
import { STOREFRONT_URL } from "../../../../../Utilities/Util";

const CustomPage = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  const handleSave = async () => {
    try {
      const res = await axios.post(`${STOREFRONT_URL}/advance`, advance);
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
              <h4>Custom Store Pages</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <p className="m-0">Privacy Policy</p>
              <a href="">Edit</a>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6}>
              <p className="m-0">Terms & Conditions</p>
              <a href="">Edit</a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CustomPage;
