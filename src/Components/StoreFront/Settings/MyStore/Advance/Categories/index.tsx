import React, { useState } from "react";
import { Row, Col ,Form, Button} from 'react-bootstrap';
import { IAdvance } from "../../../../../../Models/Advance";
import './Categories.scss'

const Categories = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Categories</h4>
              <p>
                Please check all the categories you wish to enable in your
                store.
              </p>
            </Col>
          </Row>

          <Row className="mt-3">
            <p id="DefaultCategories">Default Categories</p>
          </Row>

          <Row>
            <Col lg={6}>
              <>
                <Form.Check aria-label="option 1" label="Art" />
              </>
            </Col>

            <Col>
              <>
                <Form.Check aria-label="option 1" label="Virtual Worlds" />
              </>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={6}>
              <>
                <Form.Check aria-label="option 1" label="Trading Cards" />
              </>
            </Col>
            <Col lg={6}>
              <>
                <Form.Check aria-label="option 2" label="Collectibles" />
              </>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <>
                <Form.Check aria-label="option 3" label="Utility" />
              </>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={12}>
              <p id="DefaultCategories">Custom Categories</p>
              <p>There are no custom categories added yet.</p>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={12}>
              <Button variant="primary">Add</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Categories;