import React, { useState } from "react";
import { Row, Col, Form,Button } from "react-bootstrap";
import SwitchWidget from "../../SwitchWidget";
import './NotificationSetting.scss'

const NotificationSettingAirdrop = () => {
  const [successfultokenClaim, setsuccessfultokenClaim] = useState(false);
  const [failedtokenClaim, setfailedtokenClaim] = useState(false);

  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Notification Settings</h4>
              <p>
              Customize which notifications you would like to receive</p>
              
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={successfultokenClaim}
                setIsChecked={setsuccessfultokenClaim}
                title={"Successful Token Claim"}
                subtitle={"When someone claim one of your items"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={failedtokenClaim}
                setIsChecked={setfailedtokenClaim}
                title={"Failed Token Claim"}
                subtitle={"When someone get error while claiming a Token."}
              />
            </Col>
          </Row>
          <Row className="mt-5">
              
            <Col  className="SaveChangesBtn">
              <Button variant="primary">Save Changes</Button>
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NotificationSettingAirdrop;
