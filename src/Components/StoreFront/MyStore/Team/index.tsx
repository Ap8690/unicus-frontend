import React from 'react'
import { Row, Col, Button, Table, Form } from 'react-bootstrap';

const Team = () => {
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Users and Roles</h3>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="mt-3">
          <p>Coming Soon</p>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={12}>
          <Row>
            <Col lg={6}>
              <h4>Users & Roles</h4>
              <Form.Group className="mt-5">
                <Form.Label>List of your all blog categories.</Form.Label>
                <select
                  className="form-control"
                >
                  <option selected value="nft-manager">
                    Create, Sell, Buy/Bid/Offer, Import access
                  </option>
                  <option value="creator-seller-buyer">
                    Create, Sell, Buy/Bid/Offer access
                  </option>
                  <option value="creator-seller-importer">
                    Create, Sell, Import access
                  </option>
                  <option value="creator-seller">Create, Sell access</option>
                  <option value="seller-buyer-importer">
                    Sell, Buy/Bid/Offer, Import access
                  </option>
                  <option value="seller-buyer">
                    Sell, Buy/Bid/Offer access
                  </option>
                  <option value="creator">Create access</option>
                  <option value="seller">Sell access</option>
                  <option value="buyer">Buy/Bid/Offer access</option>
                  <option value="importer">Import access</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6}>
              <Button variant="primary">New User</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <p>Manage User & Roles</p>
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Eth Address </th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </div>
  );
}

export default Team;