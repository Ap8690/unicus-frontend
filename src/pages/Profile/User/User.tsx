// Lib
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { v4 as uuid } from "uuid";


// Styles
import "./User.scss";

// Icons
import twitter from "../../../assets/svgs/profileTwitter.svg";
import instagram from "../../../assets/svgs/profileInstagram.svg";
import facebook from "../../../assets/svgs/profileFacebook.svg";
import userImg from "../../../assets/images/userImage.png";
import backgroundImg from "../../../assets/images/userBackground.png";

import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from "../../../config";
import { userInfo } from "../../../utils/utils";
import {getCompleteDate} from "../../../utils/date";
import { updateProfileBg, updateProfilePic } from "../../../services/api/supplier";
import { useNavigate } from "react-router-dom";

const User = (): ReactJSXElement => {
const user = userInfo;
const navigate = useNavigate()

const [userImage, setUserImage] = useState<any>(
  user.profileUrl ? user.profileUrl : userImg
);
const [backgroundImage, setBackgroundImage] = useState<any>(
  user.bgUrl ? user.bgUrl : backgroundImg
);
  const profilePicFile = useRef(null);
  const bgPicFile = useRef(null);

  const uploadImage = (inputFile) => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const uploadUserImage = async (e: any) => {
    setUserImage(e.target.files);
    console.log(userImage);
    //uploading to cloudinary
    try {
        let cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", e.target.files[0]);
      cloudinaryFormData.append("upload_preset", `Unicus___User`);

      cloudinaryFormData.append("public_id", uuid());

      console.log(cloudinaryFormData);

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      const JSONdata = await cloudinaryRes.json();

      console.log(JSONdata.url);

      // now sendig cloudinary url to backend server
      
      await updateProfilePic(JSONdata.url)
        .then((res: any) => {
          console.log("Response after uploading cloudinary url -> ", res);
          if (res && res.data && res.data.user) {
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          }
        })
        .catch((err) => {
          console.log("Error while uploading cloudinary url -> ", err);
        });
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
  };

  // PORTFOLIO TO HEADER IMAGE
  const uploadBackgroundImage = async (e: any) => {
    console.log(e.target.files);
    setBackgroundImage(e.target.files);
    try {
      //set loading true
        let cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", e.target.files[0]);
      cloudinaryFormData.append("upload_preset", `Unicus___User`);

      cloudinaryFormData.append("public_id", uuid());

      console.log(cloudinaryFormData);

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      const JSONdata = await cloudinaryRes.json();

      console.log(JSONdata.url);

      // sending to backend
      await updateProfileBg(JSONdata.url)
        .then((res: any) => {
          console.log("Response after uploading cloudinary url -> ", res);

          if (res && res.data && res.data.user) {
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          }
        })
        .catch((err) => {
          console.log("Error while uploading cloudinary url -> ", err);
        });
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
  };
  const handleClick=()=>{
    navigate("/edit-profile")
  }
  return (
    <div className="user">
      <div
        className="user-background-image"
        onClick={() => uploadImage(bgPicFile)}
      >
        <img src={backgroundImage} alt="Background" />
        <input
          type="file"
          id="file"
          ref={bgPicFile}
          accept="image/jpeg, image/png , image/svg+xml"
          onChange={(e) => uploadBackgroundImage(e)}
          className="d-none"
        />
      </div>
      <div className="user-details">
        <div className="user-image" onClick={() => uploadImage(profilePicFile)}>
          <img src={userImage} alt={user.username} />
          <input
            type="file"
            id="file"
            ref={profilePicFile}
            accept="image/jpeg, image/png , image/svg+xml"
            onChange={(e) => uploadUserImage(e)}
            className="d-none"
          />
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.username}</h3>
          <p className="user-id">{user.id}</p>
          <p className="user-join-date">Joined: {getCompleteDate(user.createdAt)}</p>
          <div className="user-links">
            {user.twitter && <a href={user.twitter}>
              <img src={twitter} alt="twitter" />
            </a>}
            {user.instagram && <a href={user.instagram}>
              <img src={instagram} alt="instagram" />
            </a>}
           {user.facebook &&  <a href={user.facebook}>
              <img src={facebook} alt="facebook" />
            </a>}
          </div>
        </div>
        <button className="edit-profile" onClick={handleClick}>Edit Profile</button>
      </div>
    </div>
  );
};

export default User;
