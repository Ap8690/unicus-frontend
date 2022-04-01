import React from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';

const CategoriesBlog = () => {
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Category List</h4>
              <p>List of your all blog categories.</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6}>
              <Button variant="primary">Add Category</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
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

export default CategoriesBlog;