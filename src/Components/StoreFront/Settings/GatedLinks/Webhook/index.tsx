import React, { useRef } from 'react'
import { Row, Col, Button, Form,Table } from 'react-bootstrap';
import './Webhook.scss';

const Webhook = () => {
    
  return (
    <div className="general">
   <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Webhook</h4>
            </Col>
          </Row>
          
            <Col lg={6}>
              <Row className="mt-4">
                <Col lg={12}>
                  <Form.Group id ="FormUrl" className="mb-4 d-flex flex-column">
                    <Form.Label>Please enter the webhook URL where you want us to throw the details of each Token Gated Link's view.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://www.webhook.io/hrtdhw"
                    />
                  </Form.Group>
                </Col>
                
              </Row>
            </Col>
            
         
          <Row className="mt-5">
          
            <Col>
              <Button variant="primary">Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    );
  }



export default Webhook