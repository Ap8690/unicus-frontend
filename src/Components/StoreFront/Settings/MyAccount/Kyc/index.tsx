import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SwitchWidget from "../../SwitchWidget";

const Kyc = () => {
  const [showSeller, setShowSeller] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);

  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>KYC</h4>
              <p>
                For now, KYC is optional for this Store.
              </p>
              <p>This feature is not enabled in current store.</p>
              
            </Col>
          </Row>
          
        </Col>
      </Row>
    </div>
  );
};

export default Kyc;
