import React, { useRef } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import './MyAirdrop.scss';

const MyAirdrop = () => {
    
  return (
    <div className="general">
    <Row>
        <Col lg={12}>
          <Row>
            <Col lg={7}>
              <h4>My Airdrops</h4>
              <p>
              List of your Airdrops you have launched.
              <br></br>To programmatically generate NFTs in bulk, please<a href="#"> contact us.</a>
              </p>
            </Col>
            <Col lg={5}>
            <Row>
              <Col></Col>
            <Col  className="NewAirdropBtn">
              <Button variant="primary">New Airdrop</Button>
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
                    <th>Token Type</th>
                    <th>Claimable Quantity</th>
                    <th>Collection</th>
                    <th>Date</th>
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



export default MyAirdrop