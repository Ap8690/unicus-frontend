import React, { useRef, useState, useEffect} from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import placeHolder from "./../../../../../Assets/MyStore/placeholder-logo.svg";
import SwitchWidget from "../../../SwitchWidget";
import { IAppearance } from '../../../../../Models/Appearance';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../../../Utilities/Util';
import { v4 as uuid } from "uuid";
import { CircularProgress } from '@mui/material';


const Others = (appearance: IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
  const [showFooter, setShowFooter] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const inputFile = useRef(null);
  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  useEffect(() => {    
    setAppearance(appearance)
    setShowFooter(appearance.showFooter)
    console.log("app", appearance.storeLoader);
    
    if(!appearance.storeLoader){
      setAppearance({...appearance, storeLoader:""});      
    }
  }, [appearance])
  
  useEffect(() => {
    setAppearance({ ...Appearance, showFooter, showGettingStarted });
  }, [showFooter, showGettingStarted]);
  
  const getImageUrl = async (e: any) => {
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

      setAppearance({ ...Appearance, storeLoader: JSONdata.url });
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
    setLoadingImage(false);
  };
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
              <h4>Others</h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showFooter}
                setIsChecked={setShowFooter}
                title={"Footer section"}
                subtitle={"Turn this ON if you want to show Footer section"}
              />
            </Col>
            <Col lg={6} className="d-none">
              <SwitchWidget
                isChecked={showGettingStarted}
                setIsChecked={setShowGettingStarted}
                title={"Getting Started section"}
                subtitle={
                  "Turn this ON if you want to show Getting Started section in home page"
                }
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <div>
                <p className="mb-1">Store Loader</p>
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
                      Appearance.storeLoader && Appearance.storeLoader != ""
                        ? Appearance.storeLoader
                        : placeHolder
                    }
                    alt=""
                    onClick={uploadImage}
                  />
                  {!Appearance.storeLoader ||
                  (Appearance.storeLoader == "" && !loadingImage) ? (
                    <div className="text-center cursor-pointer upload-img">
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
              </div>
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
};

export default Others;