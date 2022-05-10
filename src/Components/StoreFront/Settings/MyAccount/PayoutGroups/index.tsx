import React, { useRef } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import './PayoutGroups.scss';

const PayoutGroups = () => {
    
  return (
    <div className="general">
    <Row>
        <Col lg={12}>
          <Row>
            <Col lg={6}>
              <h4>Payout Groups</h4>
              
              <p>
                List of your payout groups.<a href="#"> Learn more.</a>
              </p>
            </Col>
            <Col lg={6}>
            <Row>
              <Col></Col>
            <Col>
              <Button variant="primary">New Payout Group</Button>
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
                    <th>Number of Payees</th>
                    <th>Status</th>
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



export default PayoutGroups