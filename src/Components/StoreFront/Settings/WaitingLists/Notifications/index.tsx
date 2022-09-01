import React, { useState } from "react";
import { Row, Col, Form,Button } from "react-bootstrap";
import SwitchWidget from "../../SwitchWidget";
import './Notifications.scss'

const NotificationsWaiting = () => {
  const [joinwaitingList, setjoinwaitingList] = useState(false);

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
                isChecked={joinwaitingList}
                setIsChecked={setjoinwaitingList}
                title={"Someone Joins Any Waiting List"}
                subtitle={"When someone joins one of your waiting list"}
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

export default NotificationsWaiting;
