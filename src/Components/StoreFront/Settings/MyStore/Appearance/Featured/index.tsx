import axios from 'axios';
import React, { useState } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IAppearance } from '../../../../../../Models/Appearance';
import { BASE_URL } from '../../../../../../Utilities/Util';

const Featured = (appearance: IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/appearance`, Appearance);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Featured Assets</h4>
              <p className="mt-4 mb-0">Assets</p>
              <p>
                There are no assets in this Store yet. Click here to create new
                asset.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <p>Currently Featured Assets</p>
              <Table variant="dark" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Link</th>
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
};

export default Featured;