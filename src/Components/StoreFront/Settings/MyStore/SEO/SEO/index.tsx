import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ISeo } from "../../../../../../Models/Seo";
import { BASE_URL } from "../../../../../../Utilities/Util";
import placeholder from "./../../../../../Assets/MyStore/placeholder-logo.svg";
import "./seoTab.scss"
import { v4 as uuid } from "uuid";
import { CircularProgress } from "@mui/material";


const SEOTab = (seo:ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  const [loadingImage, setLoadingImage] = useState(false);
  const inputFile = useRef(null);
  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(() => {
    setSeo(seo)  
  }, [seo])

  const getImageUrl = async (e, flag) => {
    //uploading to cloudinary
    try {
      setLoadingImage(true);
      let cloudinaryFormData = new FormData();

      cloudinaryFormData.append("file", e.target.files[0]);
      cloudinaryFormData.append("upload_preset", `Unicus___User`);

      cloudinaryFormData.append("public_id", uuid());

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      const JSONdata = await cloudinaryRes.json();

      if(flag=== 0){
      setSeo({ ...Seo, favicon: JSONdata.url });
      }
      if(flag === 1){
        setSeo({ ...Seo, featuredImage: JSONdata.url });
      }
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
    setLoadingImage(false);
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/seo`, seo);
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
              <h4>SEO</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Meta Title"
                  value={Seo.metaTitle}
                  onChange={(e) =>
                    setSeo({ ...Seo, metaTitle: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Meta Keyword</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Meta Keyword"
                  value={Seo.metaKeyword}
                  onChange={(e) =>
                    setSeo({ ...Seo, metaKeyword: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  rows={8}
                  value={Seo.metaDescription}
                  onChange={(e) =>
                    setSeo({ ...Seo, metaDescription: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <div>
                <p className="mb-2">Favicon</p>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={(e) => getImageUrl(e, 0)}
                  className="d-none"
                />
                {loadingImage ? <CircularProgress /> : ""}
                <img
                  className="seo-img"
                  src={placeholder}
                  alt=""
                  onClick={uploadImage}
                />
                <p className="mt-2 logo-sub">
                  Please upload a file in 256x256px size or similar ratio.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div>
                <p className="mb-2">Featured Image</p>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={(e) => getImageUrl(e, 1)}
                  className="d-none"
                />
                {loadingImage ? <CircularProgress /> : ""}
                <img
                  className="seo-img"
                  src={placeholder}
                  alt=""
                  onClick={uploadImage}
                />
                <p className="mt-2 logo-sub">
                  Please upload a file in 750x430px size or similar ratio.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="SaveChangesBtn">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SEOTab;
