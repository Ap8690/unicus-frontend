// Lib
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import uuid from "react-uuid";
// Styles
import "./User.scss";
// Icons
import twitter from "../../../assets/svgs/profileTwitter.svg";
import instagram from "../../../assets/svgs/profileInstagram.svg";
import facebook from "../../../assets/svgs/profileFacebook.svg";
import discord from "../../../assets/images/discord.svg";
import linkedin from "../../../assets/images/linkedin.png";
import userImg from "../../../assets/images/userImage.png";
import backgroundImg from "../../../assets/images/userBackground.png";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { getCompleteDate } from "../../../utils/date";
import {
    updateProfileBg,
    updateProfilePic,
} from "../../../services/api/supplier";
import { useNavigate } from "react-router-dom";
import { cookieDomain } from "../../../config";
import { toast } from "react-toastify";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const User = ({ user }): ReactJSXElement => {
    const navigate = useNavigate();

    const [userImage, setUserImage] = useState<any>(
        user?.profileUrl ? user?.profileUrl : userImg
    );
    const [backgroundImage, setBackgroundImage] = useState<any>(
        user?.backgroundUrl ? user?.backgroundUrl : backgroundImg
    );
    const [uploadLoading, setUploadLoading] = useState(false);
    const profilePicFile = useRef(null);
    const bgPicFile = useRef(null);

    const uploadImage = (inputFile: any) => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const uploadUserImage = async (e: any) => {
        try {
            setUploadLoading(true);
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
            setUserImage(JSONdata.url);
            // now sendig cloudinary url to backend server
            const res = await updateProfilePic(JSONdata.url);

            if (res && res.data && res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    domain: cookieDomain,
                    expires: 30,
                });
            }
            setUploadLoading(false);
        } catch (err) {
            setUploadLoading(false);
            toast.error(err?.response.data || "Image upload error");
            console.log("Cloudinary User Image Upload Error ->", err);
        }
    };

    // PORTFOLIO TO HEADER IMAGE
    const uploadBackgroundImage = async (e: any) => {
        try {
            setUploadLoading(true);
            //set loading true
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

            setBackgroundImage(JSONdata.url);
            // sending to backend
            const res = await updateProfileBg(JSONdata.url);
            if (res && res.data && res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    domain: cookieDomain,
                    expires: 30,
                });
            }
            setUploadLoading(false);
        } catch (err) {
            console.log("Cloudinary User Image Upload Error ->", err);
            setUploadLoading(false);
            toast.error(err?.response.data || "Image upload error");
        }
    };
    const handleClick = () => {
        navigate("/edit-profile");
    };

    return (
        <div className="user">
            <div
                className="user-background-image"
                onClick={() => uploadImage(bgPicFile)}
            >
                <img className="w-100 object-cover" src={backgroundImage} alt="Background" />
                {/* <input
                    type="file"
                    id="file"
                    ref={bgPicFile}
                    accept="image/jpeg, image/png , image/svg+xml"
                    onChange={(e) => uploadBackgroundImage(e)}
                    className="d-none"
                /> */}
            </div>
            <div className="user-details">
                <div
                    className="user-image custom-border-right"
                    onClick={() => uploadImage(profilePicFile)}
                >
                    <img src={userImage} alt={user?.username} />
                    {/* <input
                        type="file"
                        id="file"
                        ref={profilePicFile}
                        accept="image/jpeg, image/png , image/svg+xml"
                        onChange={(e) => uploadUserImage(e)}
                        className="d-none"
                    /> */}
                </div>
                <div className="user-info">
                    <h3 className="user-name custom-border-bottom">
                        {user?.username.length>30 ? user?.username.slice(0,8) + '...' + user?.username.slice(-6) : user?.username}
                    </h3>
                    <h5 className="text-[16px] custom-border-bottom">
                        {user?.bio}
                    </h5>
                    <p className="user-id">{user?.id}</p>
                    <p className="user-join-date custom-border-bottom">
                        Joined:{" "}
                        <span>
                            {user?.createdAt && getCompleteDate(user?.createdAt)}
                        </span>
                    </p>
                    <div className="user-links mt-2">
                        {user?.twitter && (
                            <a target="_blank" href={user?.twitter}>
                                <img src={twitter} alt="twitter" />
                            </a>
                        )}
                        {user?.instagram && (
                            <a target="_blank" href={user?.instagram}>
                                <img src={instagram} alt="instagram" />
                            </a>
                        )}
                        {user?.facebook && (
                            <a target="_blank" href={user?.facebook}>
                                <img src={facebook} alt="facebook" />
                            </a>
                        )}
                        {user?.discord && (
                            <a target="_blank" href={user?.discord} className="h-[24px]">
                                <img src={discord} alt="discord" className="h-[24px]" />
                            </a>
                        )}
                        {user?.linkedIn && (
                            <a target="_blank" href={user?.linkedIn} className="h-[24px]">
                                <img src={linkedin} alt="linkedin"  className="h-[24px]" />
                            </a>
                        )}
                    </div>
                </div>
                <button className="edit-profile" onClick={handleClick}>
                    <ModeEditOutlineOutlinedIcon />
                </button>
            </div>
        </div>
    );
};

export default User;
