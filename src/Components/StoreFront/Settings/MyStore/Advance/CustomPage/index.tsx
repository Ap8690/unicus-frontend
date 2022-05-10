import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IAdvance } from '../../../../../Models/Advance';
import { BASE_URL, defaultPrivacyText } from '../../../../../Utilities/Util';
import { Editor } from "@tinymce/tinymce-react";
import EditorModal from './EditorModal';


const CustomPage = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  const [show, setShow] = useState(false)
  const [key, setKeyString] = useState("")
  useEffect(() => {
    setAdvance(advance);
  }, [advance]);
  useEffect(() => {
    console.log("key or", key);
    
  }, [key]);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/advance`, advances);
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
              <h4>Custom Store Pages</h4>
              <p>You can add text with html tags for formatting purposes.</p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <p className="m-0">Privacy Policy</p>
              <p className='d-none' onClick={()=>{setKeyString("privacyPolicy"); setShow(true) }}>Edit</p>
              <Form.Control
                as="textarea"
                disabled
                placeholder="Enter Privacy Policy"
                rows={5}
                value={advances.privacyPolicy}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6}>
              <p className="m-0">Terms & Conditions</p>
              <Form.Control
                as="textarea"
                placeholder="Enter Terms & Conditions"
                rows={5}
                value={advances.terms}
                onChange={(e) =>
                  setAdvance({ ...advances, terms: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6}>
              <p className="m-0">About Us</p>
              <Form.Control
                as="textarea"
                placeholder="Enter About Us"
                rows={5}
                value={advances.terms}
                onChange={(e) =>
                  setAdvance({ ...advances, aboutUs: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col lg={6}>
              <p className="m-0">Creators</p>
              <Form.Control
                as="textarea"
                placeholder="Enter Creators"
                rows={5}
                value={advances.terms}
                onChange={(e) =>
                  setAdvance({ ...advances, creators: e.target.value })
                }
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="SaveChangesBtn">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Col>
          </Row>

          <EditorModal
            show={show}
            setShow={setShow}
            key={key}
            advance={advance}
            setAdvance={setAdvance}
            title={"Privacy Policy"}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CustomPage;