import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import ReactHtmlParser from "react-html-parser";
import "./style.scss"

const PrivacyPolicy = (props) => {
  
  return (
    <div>
      <Row className="my-store-cont mt-5 px-5">
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h1 className="paraTitle" style={{ float: "left", marginTop: "70px", marginLeft:"25px" }}>
                {props.title}
              </h1>
            </Col>
          </Row>
          <Row className="mt-5 px-4">
            <Col lg={12} className="paracontent">
              {ReactHtmlParser(props.text)}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default PrivacyPolicy