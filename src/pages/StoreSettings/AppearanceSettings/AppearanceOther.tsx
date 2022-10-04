import { useEffect, useRef, useState } from "react"
import { IOSSwitch } from "../GeneralSettings/GeneralBasic"
import uploadImg from "../../../assets/svgs/uploadImage.svg"
import { IAppearance } from "../../../models/Appearance";
import axios from "axios";
import toast from 'react-hot-toast';

import { BASE_URL } from "../../../config";
import uuid from "react-uuid";
import { CircularProgress } from "@mui/material";


const AppearanceOther = (appearance: IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
  const [footer, setFooter] = useState(true);
  const [storeLoader, setStoreLoader] = useState();
    const [loadingImage, setLoadingImage] = useState(false);

    const inputFile = useRef(null);

  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const handleStoreLoader = (e) => {
    setStoreLoader(e.target.value);
  };
   useEffect(() => {
     setAppearance(appearance);
     setFooter(appearance.showFooter);
     if (!appearance.storeLoader) {
       setAppearance({ ...appearance, storeLoader: "" });
     }
   }, [appearance]);
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
    <div className="advanced-supported">
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={footer}
          onChange={(e: any) => setFooter(e.target.checked)}
        />
        <div className="terms">
          <span className="large-text">Footer Section</span>
          <span>Turn this ON/off to show Footer section</span>
        </div>
      </div>
      <div className="file-upload-container">
        <div className="title">Store Loader</div>
        <label className="file-upload-box">
          <div id="">
            {loadingImage ? (
              <CircularProgress className="progress-spinner" />
            ) : (
              ""
            )}

            <img
              className="logo-img cursor-pointer"
              src={
                Appearance.storeLoader && Appearance.storeLoader !== ""
                  ? Appearance.storeLoader
                  : uploadImg
              }
              alt=""
              onClick={uploadImage}
            />
            {!Appearance.storeLoader ||
            (Appearance.storeLoader === "" && !loadingImage) ? (
              <div className="text-center cursor-pointer upload-img">
                <img width={120} src={uploadImg} alt="" onClick={uploadImage} />
                <p>Click here to upload image</p>
              </div>
            ) : (
              ""
            )}
          </div>{" "}
          <input
            type="file"
            id="file"
            ref={inputFile}
            accept="image/jpeg, image/png , image/svg+xml"
            onChange={(e) => getImageUrl(e)}
            className="d-none"
          />{" "}
        </label>
      </div>
      <button className="btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default AppearanceOther
