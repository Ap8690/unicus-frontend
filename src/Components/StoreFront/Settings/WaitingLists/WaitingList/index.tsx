import React, { useRef } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import './WaitingList.scss';

const WaitingList = () => {
    
  return (
    <div className="general">
    <Row>
        <Col lg={12}>
          <Row>
            <Col lg={6}>
              <h4>Waiting List</h4>
              <p>
              List of your Waiting List you have created.
              </p>
            </Col>
            <Col lg={6}>
            <Row>
              <Col></Col>
            <Col>
              <Button className="NewWaitingListBtn" variant="primary">New Waiting List</Button>
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
                    <th>Created At</th>
                    <th>All Users</th>
                    <th>Joined Users</th>
                    <th>Action</th>


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



export default WaitingList