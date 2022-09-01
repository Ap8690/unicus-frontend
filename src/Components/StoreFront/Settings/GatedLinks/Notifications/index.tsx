import React, { useState } from "react";
import { Row, Col, Form,Button } from "react-bootstrap";
import SwitchWidget from "../../SwitchWidget";
import './Notifications.scss'

const Notifications = () => {
  const [successfullinkView, setsuccessfullinkView] = useState(false);
  const [failedlinkView, setfailedlinkView] = useState(false);

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
                isChecked={successfullinkView}
                setIsChecked={setsuccessfullinkView}
                title={"Successful Link View"}
                subtitle={"When someone cross the gate to view your link"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={failedlinkView}
                setIsChecked={setfailedlinkView}
                title={"Failed Link View"}
                subtitle={"When someone get the error while viewing your link."}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            
            <Col>
            <Button variant="primary">Save Changes</Button>{" "}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Notifications;
