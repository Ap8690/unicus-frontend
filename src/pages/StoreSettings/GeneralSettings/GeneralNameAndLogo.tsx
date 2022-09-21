import { useEffect, useMemo, useRef, useState } from "react"
import Input from "../../../components/Input/Input"
import uploadImg from "../../../assets/svgs/uploadImage.svg"
import { IGeneral } from "../../../models/General";
import axios from "axios";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";
import uuid from "react-uuid";
import { Form } from "react-bootstrap";
import { FormControl, MenuItem, Select } from "@mui/material";
import { axiosConfig, saveGenerals } from "../../../services/api/supplier";

const GeneralNameAndLogo = (general: IGeneral) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({});
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeCountry, setStoreCountry] = useState("");
  const [logo, setLogo] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const inputFile = useRef(null);

  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  

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

  const handleStoreName = (e:any) => {
    setGeneral({ ...generals, storeName: e });
  };

  const handleEmail = (e:any) => {
    setGeneral({ ...generals, email: e });
  };
  const handleCountry = (e:any) => {
    setGeneral({ ...generals, country: e });
  };
  const handleSave = async () => {
    try {
      const res = await saveGenerals(generals);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err:any) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  useEffect(() => {
    setGeneral(general);
  }, [general]);
  useEffect(() => {
    if(Object.keys(general).length !== 0)
    setGeneral(general)
  },[])
  return (
    <div className="general-name-logo">
      <div className="create-store-form">
        <div className="form-input">
          <label htmlFor="store-name">{generals?.storeName ? generals.storeName :"Store Name"}</label>
          <Input
            type="text"
            id="store-name"
            state={generals.storeName}
            setState={
              handleStoreName
            }
            placeholder="Enter Store Name"
            maxLength={25}
          />
          <div className="store-name-length">
            {generals.storeName ? generals.storeName.length : "0"}/25
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            state={generals.email}
            setState={
              handleEmail
            }
            placeholder="Enter Email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="country">Country</label>
          <FormControl
            variant="standard"
            sx={{ m: 0, minWidth: 120, width: "100%" }}
          >
            <Select
              labelId="chain-select-label"
              id="chain-select"
              value={generals.country}
              onChange={(e) => handleCountry(e.target.value)}
            >
              {options.map((item) => (
                <MenuItem key={uuid()} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <button className="btn" onClick={() => handleSave()}>
          Save Changes
        </button>
      </div>
      <div className="file-upload-container">
        <div className="title">Logo</div>
        <label className="file-upload-box">
          {generals.logoUrl === "" ? (
            <img src={uploadImg} alt="" onClick={uploadImage} />)
          :(
            <img
              src={generals.logoUrl}
              alt=""
              style={{ width: "90%" }}
              onClick={uploadImage}
            />
          )}
          <input
            type="file"
            id="file"
            ref={inputFile}
            accept="image/jpeg, image/png , image/svg+xml"
            onChange={(e) => getImageUrl(e)}
            className="d-none"
          />
        </label>
        <div className="file-size-info">
          Please upload a jpeg, png or svg file for your logo in 400x300 pixel
          size or similar ratio
        </div>
      </div>
    </div>
  );
};

export default GeneralNameAndLogo
