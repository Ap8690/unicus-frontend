import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';

const Billing = () => {
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Billing</h3>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col lg={6}>
          <p>Current Plan</p>
          <p className="h5 font-weight-bold">Free</p>
        </Col>
        <Col lg={6}>
          <p>Amount</p>
          <p className="h5 font-weight-bold">US$ 0</p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p>Next Billing Amount</p>
          <p className="h5 font-weight-bold">US$ 0</p>
        </Col>
        <Col lg={6}>
          <p>Next Billing Date</p>
          <p className="h5 font-weight-bold">N/A</p>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col lg={6} >
          <p>Please upgrade to avail premium features.</p>
          <Button variant="primary">Upgrade Plan</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Billing;