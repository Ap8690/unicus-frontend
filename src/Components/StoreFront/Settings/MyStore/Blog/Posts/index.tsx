import React from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap';

const Posts = () => {
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Post List</h4>
              <p>List of your all blog post.</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6}>
              <Button variant="primary">Add Post</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Post Title</th>
                    <th>Slug</th>
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

export default Posts