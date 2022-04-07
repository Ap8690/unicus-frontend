import axios from "axios";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { IGeneral } from "../../../Models/General";
import { STOREFRONT_URL } from "../../../Utilities/Util";
import placeHolder from "./../../../Assets/MyStore/placeholder-logo.svg";
import { CircularProgress } from "@mui/material";
import countryList from "react-select-country-list";
import validator from "validator";
import "./style.scss"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import WalletsPopup from "../../Modals/WalletsPopup/WalletsPopup";

const CreateStore = (store) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { accessToken, userInfo } = useSelector(
        (state: any) => state.profile
      );

  const options = useMemo(() => countryList().getData(), []);
  const inputFile = useRef(null);
  const history = useHistory();
  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(() => {
     if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
       setOpen(true)
       return;
     }
    let email = ""
    if(userInfo.email){
      email = userInfo.email
    }        
    
    setGeneral({ ...generals, storeName:"", email: email, country:"US", logoUrl: "" });
  }, [userInfo]);
  

  useEffect(() => {
    if (Object.keys(store).length !== 0) {
      history.replace("/");
      return;
    }
  }, [store]);


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

      setGeneral({ ...generals, logoUrl: JSONdata.url });
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
    setLoadingImage(false);
  };
  const handleStoreName = (e) => {
    setGeneral({ ...generals, storeName: e });
  };

  const handleEmail = (e) => {
    setGeneral({ ...generals, email: e });
  };
  const handleCountry = (e) => {
    setGeneral({ ...generals, country: e });
  };
  const handleCreateStore = async () => {
    try {
      setLoading(true)
      if (!generals.email && !generals.storeName){      
        throw "Please fill all fields."
      }
      if(!validator.isEmail(generals.email)){
          throw "Invalid Email"
      }
      const axiosConfig: any = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
        const res = await axios.post(
          `${STOREFRONT_URL}/store/create`,
          {store: generals, user: userInfo}, axiosConfig
        );
      setLoading(false);      
      if (res) {  
        toast.success("Store Created");
        setTimeout(function () {
          toast("Redirecting to your store");
        }, 1000);
        setTimeout(function(){
        history.push("/")
        window.open(
          `http://${res.data.createStore.domain}.unicus.one/my-store/general`,
          " _blank"
        );
      }, 3000)
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err.message, err.response);
      setLoading(false);      
      if (err.response) {
        if (err.response.status == 401){
          toast.error("Login expired. Please Login again.");
        }else{
          toast.error(err.response.data.msg)
        }
        return;
      }
      toast.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="my-store-cont">
      <Row className="mt-4 create-store">
        <Col>
          <Row>
            <Col lg={12}>
              <h1 className="section_heading">Create Store</h1>
              <h1
                className="section_heading"
                style={{
                  // color: '#D4D4D4',
                  marginBottom: "80px",
                  fontSize: "20px",
                }}
              >
                Launch your own white-label NFT store or NFT Marketplace without
                any technical knowledge.
              </h1>{" "}
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
                      generals.logoUrl && generals.logoUrl != ""
                        ? generals.logoUrl
                        : placeHolder
                    }
                    alt=""
                    onClick={uploadImage}
                  />
                  {(!generals.logoUrl || generals.logoUrl == "") && !loadingImage ? (
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
                  Please upload a jpeg, png or svg file of your logo in 400x300
                  px size or similar ratio
                </p>
              </div>
            </Col>
            <Col md={6}>
              <Form>
                <Form.Group className="mt-4">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Store Name"
                    maxLength={25}
                    value={generals.storeName}
                    onChange={(e) => handleStoreName(e.target.value)}
                  />
                </Form.Group>
                <p style={{ float: "right" }} className="mt-2 mb-4">
                  {generals.storeName ? generals.storeName.length : "0"}/25
                </p>
                <Form.Group className="mt-4 mb-4">
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
              <Button
                disabled={loading}
                variant="primary"
                className="CreateStoreBtn mt-4"
                onClick={handleCreateStore}
              >
                {loading ? "Creating..." : "Create Store"}
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className=""></Col>
          </Row>
        </Col>
      </Row>
      <WalletsPopup
        show={open}
        storeRegistration={true}
        handleClose={() => {
          setOpen(false);
        }}
        redirectUrl={"/create-store"}
      />
    </div>
  );
};

export default CreateStore;
