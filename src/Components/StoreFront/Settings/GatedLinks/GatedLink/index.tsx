import React, { useRef } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import './GatedLink.scss';

const GatedLink = () => {
    
  return (
    <div className="general">
    <Row>
        <Col lg={12}>
          <Row>
            <Col lg={7}>
              <h4>Gated Links</h4>
              <p>
              List of your Gated Links you have created.
              </p>
            </Col>
            <Col>
            <Row>
              <Col></Col>
            <Col>
              <Button id="NewGatedLinkBtn"variant="primary">New Gated Link</Button>
              </Col>
          </Row>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Per Address Access Limit</th>
                    <th>Access Count</th>
                    <th>Access Limit</th>
                    <th>Manage</th>


                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
    );
  }



export default GatedLink