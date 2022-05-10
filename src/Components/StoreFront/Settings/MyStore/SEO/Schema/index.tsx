import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { ISeo } from "../../../../../Models/Seo";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const Schema = (seo:ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  const [showAssets, setShowAssets] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
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
              <h4>Schema</h4>
              <p>
                Note: We automatically prepare site schema for your site, you
                can choose here for the following items to include/exclude from
                site schema.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showAssets}
                setIsChecked={setShowAssets}
                title={"Assets"}
                subtitle={""}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showCollections}
                setIsChecked={setShowCollections}
                title={"Collections"}
                subtitle={""}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Schema;
