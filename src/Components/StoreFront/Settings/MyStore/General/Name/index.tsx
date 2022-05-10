import axios from 'axios'
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { v4 as uuid } from "uuid";
import { Row, Col, Button, Form } from 'react-bootstrap'
import { toast } from "react-toastify";
import { IGeneral } from '../../../../../Models/General'
import { BASE_URL } from '../../../../../Utilities/Util'
import placeHolder from "./../../../../../Assets/MyStore/placeholder-logo.svg"
import "./name.scss"
import { CircularProgress } from '@mui/material';
import countryList from "react-select-country-list";

const Name = (general: IGeneral) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({})
  const [loadingImage, setLoadingImage] = useState(false)
  const options = useMemo(() => countryList().getData(), []);
  const inputFile = useRef(null);
   const uploadImage = () => {
     // `current` points to the mounted file input element
     inputFile.current.click();
   }; 
   useEffect(() => {     
     setGeneral(general)
   }, [general])

    const getImageUrl = async (e: any) => {
      //uploading to cloudinary
      try {
        setLoadingImage(true)
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

        setGeneral({ ...generals, logoUrl: JSONdata.url });


      } catch (err) {
        console.log("Cloudinary User Image Upload Error ->", err);
      }
      setLoadingImage(false)
    };
   const handleStoreName=(e)=>{
     setGeneral({...generals, storeName:e})
   }
   
   const handleEmail = (e) => {
     setGeneral({ ...generals, email: e });
   };
   const handleCountry = (e) => {
    setGeneral({ ...generals, country: e });     
   };
   const handleSave=async()=>{
     try{       
       const res = await axios.post(`${BASE_URL}/general`, generals)
       if(res){
          toast.success("Saved Changes");
       }
       else{
         throw "Failed";
       }
     }
     catch(err){
       console.log("err", err);
if (err.response) {
  toast.error(err.response.data.err);
} else {
  toast.error(err.message);
}     }
   }
   
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>My Store</h4>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <div>
                <Form.Label>Logo</Form.Label>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  accept="image/jpeg, image/png , image/svg+xml"
                  onChange={(e) => getImageUrl(e)}
                  className="d-none"
                />
                <div id="">
                  {loadingImage ? (
                    <CircularProgress className="progress-spinner" />
                  ) : (
                    ""
                  )}

                  <img
                    className="logo-img cursor-pointer"
                    src={
                      generals.logoUrl != "" ? generals.logoUrl : placeHolder
                    }
                    alt=""
                    onClick={uploadImage}
                  />
                  {generals.logoUrl == "" && !loadingImage ? (
                    <div
                      className="text-center cursor-pointer upload-img"
                      style={{}}
                    >
                      <img
                        width={120}
                        src={
                          "https://nayan.nftically.com/images/uploadicon.svg"
                        }
                        alt=""
                        onClick={uploadImage}
                      />
                      <p>Click here to upload image</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-2 logo-sub">
                  Please upload a jpeg, png or svg file of your logo in 400x300 px size or
                  similar ratio
                </p>
              </div>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Name"
                    value={generals.storeName}
                    onChange={(e) => handleStoreName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>E-Mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={generals.email}
                    onChange={(e) => handleEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4 d-flex flex-column">
                  <Form.Label>Country</Form.Label>
                  <select
                    className="form-control cursor-pointer"
                    value={generals.country}
                    onChange={(e) => handleCountry(e.target.value)}
                  >
                    {options.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="mt-5 d-none">
            <Col lg={12}>
              <p>Visit Store: XYZ</p>
            </Col>
          </Row>
          <Row className="mt-5">
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
}

export default Name