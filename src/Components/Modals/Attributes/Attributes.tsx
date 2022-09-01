import {Col, Form, Row} from 'react-bootstrap'

const Attributes = ({
  closeAttributeModal,
  inputFilesList,
  addInputField,
  removeInputField,
  handleAttributeChange,
}: any) => {
  
  
  return (
    <div className="success__body attributes">
      <p>
        Properties show up underneath your item, are clickable, and can be
        filtered in your collection's sidebar
      </p>
      <Row>
        {inputFilesList?.map((item: any, index: any) => (
          <>
            <Col sm={12} lg={6} xl={6}>
              <Form.Group className="mb-3 lol">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  className="shadow-none form-control"
                  size="lg"
                  name="propertyType"
                  value={item.propertyType}
                  onChange={(e) => handleAttributeChange(e, index)}
                />
              </Form.Group>
            </Col>
            <Col sm={12} lg={6} xl={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="propertyName"
                  // placeholder='Character'
                  className="shadow-none form-control"
                  size="lg"
                  value={item.propertyName}
                  onChange={(e) => handleAttributeChange(e, index)}
                />
              </Form.Group>
            </Col>
          </>
        ))}
      </Row>
      <Row>
        <Col sm={12} lg={4} xl={4}>
          {inputFilesList?.length > 1 && (
            <button
              onClick={() => removeInputField(inputFilesList?.length - 1)}
              className="btn_brand mt-3"
            >
              Remove Field
            </button>
          )}
        </Col>
        <Col sm={12} lg={4} xl={4}>
          <button onClick={addInputField} className="btn_brand mt-3">
            Add More
          </button>
        </Col>
        <Col sm={12} lg={4} xl={4}>
          <button onClick={closeAttributeModal} className="btn_brand mt-3">
            Save
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default Attributes
